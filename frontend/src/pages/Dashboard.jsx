import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bookmark,
  Users,
  Compass,
  FileText,
  CheckCircle,
  HelpCircle,
  Settings,
  Bell,
  Plus,
  MapPin,
  ChevronDown,
  SlidersHorizontal,
  LogOut,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import RecordLogo from "../components/RecordLogo";

// Static profile card data
const profilesData = [
  {
    id: 1,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Coimbatore",
    type: "Full Time",
    status: "available",
    match: 92,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: true,
  },
  {
    id: 2,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Chennai",
    type: "Full Time",
    status: "busy",
    match: 85,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 3,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Bangalore",
    type: "Full Time",
    status: "offline",
    match: 78,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 4,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Pollachi",
    type: "Full Time",
    status: "available",
    match: 95,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: true,
  },
  {
    id: 5,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Madurai",
    type: "Full Time",
    status: "available",
    match: 88,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: true,
  },
  {
    id: 6,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Salem",
    type: "Full Time",
    status: "busy",
    match: 91,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: true,
  },
  {
    id: 7,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Erode",
    type: "Full Time",
    status: "available",
    match: 76,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 8,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Tirunelveli",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 9,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Tirupur",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 10,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Vellore",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 11,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Cochin",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 12,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Coimbatore",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 13,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Tirupur",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
  {
    id: 14,
    initials: "A. K.",
    name: "A. K. | Marketing Strategist",
    location: "Tiruchy",
    type: "Full Time",
    status: "available",
    match: 82,
    description:
      "Passionated in digital marketing with 6 months internship experience. Have done 3 projects & gained 6 certificates in digital marketing.",
    skills: [
      { name: "Google Ads", count: 4, endorsements: "4 Endorsements" },
      { name: "Email Marketing", count: 3, endorsements: "3 Endorsements" },
      { name: "Facebook Ads", count: 2, endorsements: "2 Endorsements" },
      { name: "Marketing Strategy", count: 1, endorsements: "1 Endorsements" },
      { name: "Growth Hacking", count: 1, endorsements: "1 Endorsements" },
    ],
    verified: false,
  },
];

// Sidebar navigation items
const navItems = [
  { icon: Search, label: "Discover", active: true },
  { icon: Bookmark, label: "Shortlist", active: false },
  { icon: Users, label: "Hired", active: false },
];

const bottomNavItems = [
  { icon: HelpCircle, label: "Help" },
  { icon: Settings, label: "Settings" },
];

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 mt-1 w-full animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="flex gap-4">
        <div className="w-[54px] h-[54px] bg-gray-200 rounded-xl shrink-0" />
        <div className="flex flex-col justify-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-48" />
          <div className="h-3 bg-gray-100 rounded w-32" />
        </div>
      </div>
      <div className="h-9 bg-gray-200 rounded-md w-24" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-5/6" />
    </div>
    <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-8 bg-gray-100 rounded-md w-24" />
      ))}
    </div>
  </div>
);

// Profile Card Component
const ProfileCard = ({ profile, toggleShortlist }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mt-1 w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-4 min-w-0">
          {/* Avatar with Status Dot */}
          <div className="relative shrink-0">
            <div className="w-[54px] h-[54px] bg-[#1E293B] rounded-xl flex items-center justify-center">
              <User size={26} className="text-gray-300 stroke-[1.5]" />
            </div>
            {/* Availability Status Dot */}
            <div className={`absolute bottom-[-1.5px] right-[-1.5px] w-[14px] h-[14px] rounded-full border-[2.5px] border-white z-10 
              ${profile.status === "available" ? "bg-green-500" : profile.status === "busy" ? "bg-yellow-400" : "bg-gray-400"}`}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-0.5 min-w-0">
            <div className="flex items-center gap-2 pt-0.5">
              <h3 className="text-[16px] font-bold text-gray-900 leading-none tracking-tight truncate flex items-center gap-1">
                {profile.name}
                {profile.shortlisted && <Bookmark size={14} fill="#FBBF24" className="text-[#FBBF24] shrink-0" />}
              </h3>
              {profile.verified && (
                <div className="flex items-center gap-1 bg-[#EEF2FF] text-[#4F46E5] text-[9.5px] font-bold px-1.5 py-0.5 rounded-[4px] border border-[#E0E7FF] shrink-0 uppercase tracking-tight">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Verified
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium whitespace-nowrap">
              <MapPin size={13} className="text-gray-400 stroke-[2] pb-[1px]" />
              <span className="mt-[1px]">
                {profile.location} <span className="mx-1 font-bold text-gray-400">&bull;</span> {profile.type}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <button
            onClick={() => toggleShortlist(profile.id)}
            className={`p-2 border rounded-md transition-colors ${profile.shortlisted ? "text-[#FBBF24] border-[#FBBF24] bg-yellow-50 hover:bg-yellow-100" : "text-gray-400 hover:text-record-orange border-gray-100 hover:border-record-orange"}`}
          >
            <Bookmark size={18} fill={profile.shortlisted ? "#FBBF24" : "none"} />
          </button>
          <button className="px-4 py-2 bg-[#1E2A3B] text-white text-[13.5px] font-semibold rounded-md hover:bg-[#2A394E] transition-all duration-200 shrink-0">
            View Profile
          </button>
        </div>
      </div>

      {/* Match Percentage Badge and Description header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1 border border-[#D1FAE5]">
          {profile.match}% Match
        </div>
      </div>

      {/* Description */}
      <p className="text-[13.5px] text-[#A1A1A1] font-medium leading-relaxed mb-4 line-clamp-2">
        {profile.description}
      </p>

      {/* Skills */}
      <div>
        <p className="text-[13px] font-bold text-gray-900 mb-2">Skilled in</p>
        <div className="flex flex-nowrap gap-[2.5px] xl:gap-[3px] w-full justify-start items-center">
          {profile.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-[3px] border border-gray-200 rounded-[5px] p-[3px] pr-[5.5px] bg-white shrink-0"
            >
              <div className="w-[12px] h-[12px] bg-record-orange rounded-full flex items-center justify-center shrink-0">
                <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-[2px] mb-0">
                  <span className="text-[7.5px] xl:text-[8px] font-bold text-gray-800 whitespace-nowrap leading-none tracking-tight">
                    {skill.name} ({skill.count})
                  </span>
                  <div className="w-[6px] h-[6px] bg-[#4ADE80] rounded-full flex items-center justify-center shrink-0 mt-[0.5px]">
                    <svg width="4" height="4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span className="text-[5.5px] xl:text-[6px] text-gray-400 font-medium leading-none whitespace-nowrap mt-[0.5px]">
                  {skill.endorsements}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Discover");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem("record_shortlisted_profiles");
    let savedProfiles = [];
    if (saved) {
      try {
        savedProfiles = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved profiles", e);
      }
    }
    return profilesData.map(p => {
      const savedProfile = savedProfiles.find(sp => sp.id === p.id);
      return { ...p, shortlisted: savedProfile ? savedProfile.shortlisted : false };
    });
  });

  useEffect(() => {
    localStorage.setItem("record_shortlisted_profiles", JSON.stringify(profiles));
  }, [profiles]);

  // Sync profiles when more data is added (for hot reloading)
  useEffect(() => {
    if (profilesData.length !== profiles.length) {
      setProfiles(profilesData.map(p => {
        const savedProfile = profiles.find(sp => sp.id === p.id);
        return { ...p, shortlisted: savedProfile ? savedProfile.shortlisted : false };
      }));
    }
  }, [profiles.length]);

  const toggleShortlist = (id) => {
    setProfiles(profiles.map(p => {
      if (p.id === id) {
        const newStatus = !p.shortlisted;
        if (newStatus) {
          toast.success("Added to shortlist!");
        } else {
          toast.success("Removed from shortlist!");
        }
        return { ...p, shortlisted: newStatus };
      }
      return p;
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("record_user") || "{}");

  const uniqueLocations = [...new Set(profilesData.map(p => p.location))];

  const handleLogout = () => {
    localStorage.removeItem("record_token");
    localStorage.removeItem("record_user");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[#F7F8FA] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Sidebar Logo */}
        <div className="px-8 py-8 flex items-center mb-2">
          <RecordLogo size="small" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-[11px] rounded-lg text-[14.5px] font-semibold transition-all duration-200 ${activeNav === item.label
                ? "bg-[#EAECEF] text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                : "text-gray-500 hover:bg-[#EAECEF]/50"
                }`}
            >
              <item.icon size={18} strokeWidth={2.5} className={activeNav === item.label ? "text-gray-900" : "text-gray-400"} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="px-5 pb-4 space-y-1">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-[11px] rounded-lg text-[14.5px] font-semibold text-gray-500 hover:bg-[#EAECEF]/50 transition-all duration-200"
            >
              <item.icon size={18} strokeWidth={2.5} className="text-gray-400" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-6 mt-auto">
          <p className="text-[8.5px] text-gray-400 font-medium mb-1 leading-none tracking-tight">
            <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="mx-1 text-gray-300">|</span>
            <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms & Conditions</span>
          </p>
          <p className="text-[8.5px] text-gray-400 font-medium leading-tight tracking-tight whitespace-nowrap">
            @ 2024 Record Innovation and Enterprises Pvt. Ltd.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative h-screen overflow-hidden border-l border-gray-100">
        <div className="flex-1 overflow-y-auto w-full relative">

          <div className="w-full max-w-[1360px] mx-auto px-10">
            {/* Top Header Section */}
            <div className="pt-8 relative flex justify-center pb-2">
              {/* Absolute Icons Container (Top Right) */}
              <div className="absolute right-0 top-10 flex items-center gap-3 z-10">
                <button className="w-8 h-8 rounded-[6px] bg-record-orange text-white flex items-center justify-center shadow-sm">
                  <Plus size={18} strokeWidth={3} />
                </button>
                <button className="w-8 h-8 rounded-[6px] border border-gray-200 text-gray-400 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                  <Bell size={16} strokeWidth={2.5} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-8 h-8 rounded-[6px] bg-[#1E2A3B] text-white flex items-center justify-center text-[13px] font-bold shadow-sm hover:opacity-90 transition-opacity"
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1.5 border border-gray-100 z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3.5 py-2 text-[13.5px] font-semibold text-red-500 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut size={16} strokeWidth={2.5} className="text-red-500" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Center Header Titles */}
              <div className="text-center w-full max-w-[700px] mt-2 relative z-0">
                <h1 className="text-[22px] font-bold text-gray-900 mb-1.5 tracking-tight">
                  Search Verified Profiles
                </h1>
                <p className="text-[13px] text-gray-500 font-medium leading-relaxed">
                  No Junk, No Spam, No Fluff and No Bluff. All information are pre-vetted and thoroughly verified.<br />
                  Find classic green check marks for more confirmation.
                </p>
              </div>
            </div>

            {/* Filters Form */}
            <div className="mt-8 w-full">
              <div className="flex items-center justify-center gap-[15px]">
                <div className="flex-1 max-w-[410px] min-w-0">
                  <input
                    type="text"
                    placeholder="Enter Role"
                    className="w-full h-[44px] px-4 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-all bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>
                <div className="flex-1 max-w-[320px] min-w-0 relative">
                  <button className="w-full h-[44px] px-4 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-400 bg-white flex justify-between items-center hover:border-gray-300 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <span className="truncate">Select Skills</span>
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  </button>
                </div>
                {/* Location Filter */}
                <div className="flex-1 max-w-[210px] min-w-0 relative">
                  <div className="flex items-center w-full h-[44px] px-4 border border-gray-200 rounded-lg bg-white focus-within:border-gray-300 hover:border-gray-300 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] text-[14px]">
                    <input
                      type="text"
                      placeholder="Location"
                      value={locationFilter}
                      onChange={(e) => {
                        setLocationFilter(e.target.value);
                        setIsLocationDropdownOpen(true);
                      }}
                      onFocus={() => setIsLocationDropdownOpen(true)}
                      className="w-full text-[14px] font-medium text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none min-w-0"
                    />
                    <button onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)} className="focus:outline-none ml-2 shrink-0">
                      <ChevronDown size={18} className={`transition-transform ${isLocationDropdownOpen ? 'rotate-180 text-gray-600' : 'text-gray-400'}`} />
                    </button>
                  </div>

                  {/* Dropdown Menu */}
                  {isLocationDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-1.5 z-50 max-h-60 overflow-y-auto">
                      {uniqueLocations.filter(loc => loc.toLowerCase().includes(locationFilter.toLowerCase())).length === 0 ? (
                        <div className="px-4 py-2 text-[13.5px] text-gray-400">No locations found</div>
                      ) : (
                        uniqueLocations
                          .filter(loc => loc.toLowerCase().includes(locationFilter.toLowerCase()))
                          .map((loc) => (
                            <button
                              key={loc}
                              onClick={() => {
                                setLocationFilter(loc);
                                setIsLocationDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-[13.5px] transition-colors ${locationFilter.toLowerCase() === loc.toLowerCase() ? 'bg-gray-50 text-gray-900 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                            >
                              {loc}
                            </button>
                          ))
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-none">
                  <button className="h-[44px] w-[46px] border border-gray-200 rounded-lg text-gray-400 bg-white flex items-center justify-center hover:bg-gray-50 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                    <SlidersHorizontal size={18} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="mt-9 pb-16 w-full">
              {activeNav === "Shortlist" && profiles.filter(p => p.shortlisted).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 mt-10">
                  <Bookmark size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium text-lg">No profiles shortlisted yet</p>
                  <button
                    onClick={() => setActiveNav("Discover")}
                    className="mt-4 px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Discover Profiles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-5">
                  {loading
                    ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : profiles
                      .filter((profile) => activeNav === "Discover" || (activeNav === "Shortlist" && profile.shortlisted))
                      .filter((profile) => locationFilter === "" || profile.location.toLowerCase().includes(locationFilter.toLowerCase()))
                      .map((profile) => (
                        <ProfileCard key={profile.id} profile={profile} toggleShortlist={toggleShortlist} />
                      ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


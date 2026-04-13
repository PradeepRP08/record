const RecordLogo = ({ size = "default" }) => {
  const sizes = {
    small: { svg: 32, text: "text-xl" },
    default: { svg: 40, text: "text-2xl" },
    large: { svg: 52, text: "text-4xl" },
  };

  const s = sizes[size] || sizes.default;

  return (
    <div className="flex items-center gap-2">
      {/* Image logo */}
      <img
        src="/record.png"
        alt="Record Logo"
        width={s.svg}
        height={s.svg}
        className="object-contain"
      />
      <span className={`${s.text} font-bold text-gray-900 tracking-tight`}>
        record
      </span>
    </div>
  );
};

export default RecordLogo;

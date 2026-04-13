const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should call next() if valid token is provided and user is found', async () => {
    req.headers.authorization = 'Bearer valid-token';
    const decoded = { id: 'mockUserId' };
    const mockUser = { _id: 'mockUserId', name: 'Test User' };

    jwt.verify.mockReturnValue(decoded);
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });

    await protect(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith('mockUserId');
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token provided', async () => {
    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Not authorized, no token provided' }));
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid or verification fails', async () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify.mockImplementation(() => {
      throw new Error('jwt malformed');
    });

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Not authorized, token failed' }));
    expect(next).not.toHaveBeenCalled();
  });
});

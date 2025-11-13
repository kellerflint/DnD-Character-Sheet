const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/authenticateToken");

// mock the jsonwebtoken library
jest.mock("jsonwebtoken");

describe("authMiddleware unit tests", () => {
  let req, res, next;

  beforeEach(() => {
    // mock request, response, and next function
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // allow chaining
      json: jest.fn(),
      sendStatus: jest.fn(), // used by the middleware to send HTTP status codes
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("fails if no token provided", () => {
    // no authorization header
    req.headers = {};

    authMiddleware(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  test("fails if token is invalid", () => {
    // invalid token in authorization header
    req.headers = { authorization: "Bearer invalidtoken" };

    // mock jwt.verify to call the callback with an error
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(new Error("Invalid token"), null);
    });

    authMiddleware(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  test("passes when token is valid", () => {
    // valid token in authorization header
    req.headers = { authorization: "Bearer validtoken" };

    // mock jwt.verify to call the callback with decoded user info
    jwt.verify.mockImplementation((token, secret, cb) => {
      cb(null, { userId: 1 });
    });

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ userId: 1 });
    expect(next).toHaveBeenCalled();
  });
});

const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken.js");

// Mock the tocken
jest.mock("jsonwebtoken");

describe("authenticateToken middleware function test suite", () => {
    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };
        res = {
            sendStatus: jest.fn(),
        }
        next = jest.fn();
    });

    test("Returns 401 if no token is provided", () => {
        req.headers["authorization"] = null;
        authenticateToken(req, res, next);
        expect(res.sendStatus).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test("Returns 403 if the token verification fails", () => {
        req.headers["authorization"] = "an invalid token";
        jwt.verify.mockImplementationOnce((token, secret, callback) => {
            callback(new Error("Invalid Token"), null);
        });

        authenticateToken(req, res, next);
        expect(res.sendStatus).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    test("next() called and attaches user due to valid token", () => {
        req.headers["authentication"] = "valid token";
        const mockUser = { id: 1, name: "Lebron"};

        jwt.verify.mockImplementationOnce((token, secret, callback) => {
            callback(null, mockUser);
        });

        authenticateToken(req, res, () => {
            expect(req.user).toEqual(mockUser);
            done();
        });
    })
})
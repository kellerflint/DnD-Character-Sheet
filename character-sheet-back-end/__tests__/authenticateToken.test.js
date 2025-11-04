const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken.js");

// Mock the tocken
jest.mock("jsonwebtoken");

describe("authenticateToken middleware function", () => {
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
    })
})
const status200 = 200;

// (req, res) => {} is a middleware function
const getResource = (req, res) => {
    res.status(status200);
    res.send("Hello world!");
};

// es6 feature, object (getResource1: getResource1) simplified
export default {
    getResource,
};
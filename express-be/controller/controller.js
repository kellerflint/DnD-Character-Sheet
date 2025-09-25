const status200 = 200;

const getResource = (req, res) => {
    res.status(status200);
    res.send("Hello world!");
};

export default {
    getResource,
};
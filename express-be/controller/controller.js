const getHome = (req, res) => {
    res.status(200).send("Hello world!");
};

const getResource = (req, res) => {
    res.status(200).send("Resource retrieved!");
};

export default {
    getHome,
    getResource
};
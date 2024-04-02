//Bonus Assignment
const auth = (req, res, next) => {
    const userName = req.cookies.name;
    if (userName) {
        req.user = userName;
        next(); // Proceed to the next middleware
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = auth;
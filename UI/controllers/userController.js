const UserService = require("../../Services/UserService");
const userService = new UserService();

exports.getAllUsers = (req, res) => {
    res.json(userService.getAllUsers());
};

exports.getUserById = (req, res) => {
    const user = userService.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};
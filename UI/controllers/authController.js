const AuthService = require("../../Services/AuthService");
const authService = new AuthService();

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = authService.login(email, password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
};
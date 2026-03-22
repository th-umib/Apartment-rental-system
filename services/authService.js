const FileRepository = require("../Data/FileRepository");

class AuthService {
    constructor() {
        this.userRepository = new FileRepository("./Data/users.csv");
    }

    login(email, password) {
        const users = this.userRepository.getAll();
        return users.find(user => user.email === email && user.password === password);
    }
}

module.exports = AuthService;
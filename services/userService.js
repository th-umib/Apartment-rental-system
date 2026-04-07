const FileRepository = require("../Data/FileRepository");

class UserService {
    constructor() {
        this.userRepository = new FileRepository("./Data/users.csv");
    }

    getAllUsers() {
        return this.userRepository.getAll();
    }

    getUserById(id) {
        return this.userRepository.getById(id);
    }

    addUser(user) {
        this.userRepository.add(user);
        this.userRepository.save();
    }
}

module.exports = UserService;





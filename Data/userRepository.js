const path = require("path");
const FileRepository = require("./FileRepository");

class UserService {
  constructor() {
    this.userRepository = new FileRepository(path.join(__dirname, "../Data/users.csv"));
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
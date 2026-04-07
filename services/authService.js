const FileRepository = require("../Data/FileRepository");

class AuthService {
  constructor() {
    this.userRepository = new FileRepository("./Data/users.csv");
  }

  login(email, password) {
    const users = this.userRepository.getAll();

    return users.find(
      (user) =>
        String(user.email).toLowerCase() === String(email).toLowerCase() &&
        String(user.password) === String(password)
    );
  }

  register(userData) {
    const users = this.userRepository.getAll();

    const existingUser = users.find(
      (user) => String(user.email).toLowerCase() === String(userData.email).toLowerCase()
    );

    if (existingUser) {
      throw new Error("This email is already registered.");
    }

    const newId =
      users.length > 0
        ? Math.max(...users.map((user) => Number(user.id))) + 1
        : 1;

    const newUser = {
      id: newId,
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      role: "tenant",
    };

    this.userRepository.add(newUser);

    return newUser;
  }
}

module.exports = AuthService;
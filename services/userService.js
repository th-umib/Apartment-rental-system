

module.exports = UserService;

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        return await this.userRepository.create(userData);
    }
}

module.exports = UserService;
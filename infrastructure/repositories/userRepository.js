
const db = require('../database/db');

class UserRepository {
    async findById(id) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    async findByEmail(email) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    async create(user) {
        const result = await db.query(
            'INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *',
            [user.name, user.email, user.password]
        );
        return result.rows[0];
    }
}

module.exports = UserRepository;
class IRepository {
  getAll() {
    throw new Error("Method getAll() must be implemented");
  }

  getById(id) {
    throw new Error("Method getById(id) must be implemented");
  }

  add(entity) {
    throw new Error("Method add(entity) must be implemented");
  }

  save() {
    throw new Error("Method save() must be implemented");
  }
}

module.exports = IRepository;
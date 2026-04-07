const path = require("path");
const FileRepository = require("./FileRepository");

class ApartmentRepository extends FileRepository {
  constructor() {
    super(path.join(__dirname, "apartments.csv"));
  }
}

module.exports = ApartmentRepository;

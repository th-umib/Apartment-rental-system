const path = require("path");
const FileRepository = require("./FileRepository");

class InquiryRepository extends FileRepository {
  constructor() {
    super(path.join(__dirname, "inquiries.csv"));
  }
}

module.exports = InquiryRepository;
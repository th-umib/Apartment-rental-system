class Inquiry {
  constructor(id, fullName, email, subject, message, createdAt) {
    this.id = Number(id);
    this.fullName = fullName;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.createdAt = createdAt;
  }
}

module.exports = Inquiry;
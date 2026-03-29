const fs = require("fs");
const path = require("path");

class FileRepository {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  getAll() {
    if (!fs.existsSync(this.filePath)) return [];

    const content = fs.readFileSync(this.filePath, "utf-8").trim();
    if (!content) return [];

    const lines = content.split("\n");
    const headers = lines[0].split(",");

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const item = {};

      headers.forEach((header, index) => {
        item[header.trim()] = values[index] ? values[index].trim() : "";
      });

      return item;
    });
  }

  getById(id) {
    const items = this.getAll();
    return items.find((item) => Number(item.id) === Number(id));
  }

  add(item) {
    const items = this.getAll();
    items.push(item);
    this.save(items);
    return item;
  }

  update(id, updatedItem) {
    const items = this.getAll();
    const index = items.findIndex((item) => Number(item.id) === Number(id));

    if (index === -1) return null;

    items[index] = { ...items[index], ...updatedItem, id: Number(id) };
    this.save(items);
    return items[index];
  }

  delete(id) {
    const items = this.getAll();
    const filteredItems = items.filter((item) => Number(item.id) !== Number(id));

    if (items.length === filteredItems.length) return false;

    this.save(filteredItems);
    return true;
  }

  save(items) {
    if (!items || items.length === 0) return;

    const headers = Object.keys(items[0]);
    const lines = items.map((item) =>
      headers.map((header) => item[header]).join(",")
    );

    const csvContent = [headers.join(","), ...lines].join("\n");
    fs.writeFileSync(this.filePath, csvContent, "utf-8");
  }
}

module.exports = FileRepository;
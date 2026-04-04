const fs = require("fs");
const path = require("path");

class FileRepository {
  constructor(filePath) {
    this.filePath = path.resolve(filePath);
  }

  getAll() {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.log("File nuk u gjet, po krijoj file te ri...");
        fs.writeFileSync(this.filePath, "", "utf-8");
        return [];
      }

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
    } catch (error) {
      console.error("Gabim gjate leximit te file-it:", error.message);
      return [];
    }
  }

  getById(id) {
    try {
      const items = this.getAll();
      return items.find((item) => Number(item.id) === Number(id)) || null;
    } catch (error) {
      console.error("Gabim gjate kerkimit sipas ID:", error.message);
      return null;
    }
  }

  add(item) {
    try {
      const items = this.getAll();
      items.push(item);
      this.save(items);
      return item;
    } catch (error) {
      console.error("Gabim gjate shtimit te item-it:", error.message);
      return null;
    }
  }

  update(id, updatedItem) {
    try {
      const items = this.getAll();
      const index = items.findIndex((item) => Number(item.id) === Number(id));

      if (index === -1) return null;

      items[index] = { ...items[index], ...updatedItem, id: Number(id) };
      this.save(items);
      return items[index];
    } catch (error) {
      console.error("Gabim gjate perditesimit te item-it:", error.message);
      return null;
    }
  }

  delete(id) {
    try {
      const items = this.getAll();
      const filteredItems = items.filter((item) => Number(item.id) !== Number(id));

      if (items.length === filteredItems.length) return false;

      this.save(filteredItems);
      return true;
    } catch (error) {
      console.error("Gabim gjate fshirjes se item-it:", error.message);
      return false;
    }
  }

  save(items) {
    try {
      if (!items || items.length === 0) {
        fs.writeFileSync(this.filePath, "", "utf-8");
        return;
      }

      const headers = Object.keys(items[0]);
      const lines = items.map((item) =>
        headers.map((header) => item[header]).join(",")
      );

      const csvContent = [headers.join(","), ...lines].join("\n");
      fs.writeFileSync(this.filePath, csvContent, "utf-8");
    } catch (error) {
      console.error("Gabim gjate ruajtjes ne file:", error.message);
    }
  }
}

module.exports = FileRepository;
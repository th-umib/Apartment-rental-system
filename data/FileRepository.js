const fs = require("fs");
const path = require("path");
const IRepository = require("./IRepository");

class FileRepository extends IRepository {
    constructor(filePath) {
        super();
        this.filePath = path.resolve(filePath);
        this.items = this.load();
    }

    load() {
        if (!fs.existsSync(this.filePath)) return [];

        const content = fs.readFileSync(this.filePath, "utf-8").trim();
        if (!content) return [];

        const lines = content.split("\n");
        const headers = lines[0].split(",");

        return lines.slice(1).map(line => {
            const values = line.split(",");
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : "";
            });
            return obj;
        });
    }

    getAll() {
        return this.items;
    }

    getById(id) {
        return this.items.find(item => item.id == id);
    }

    add(item) {
        this.items.push(item);
    }

    save() {
        if (this.items.length === 0) {
            fs.writeFileSync(this.filePath, "");
            return;
        }

        const headers = Object.keys(this.items[0]);
        const rows = this.items.map(item => headers.map(h => item[h]).join(","));
        const csvContent = [headers.join(","), ...rows].join("\n");

        fs.writeFileSync(this.filePath, csvContent, "utf-8");
    }
}

module.exports = FileRepository;
const FileRepository = require("../Data/FileRepository");

class ApartmentService {
    constructor() {
        this.apartmentRepository = new FileRepository("./Data/apartments.csv");
    }

    getAllApartments() {
        return this.apartmentRepository.getAll();
    }

    getApartmentById(id) {
        return this.apartmentRepository.getById(id);
    }

    addApartment(apartment) {
        this.apartmentRepository.add(apartment);
        this.apartmentRepository.save();
    }
}

module.exports = ApartmentService;
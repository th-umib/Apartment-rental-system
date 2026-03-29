const Apartment = require("../Models/apartment");

class ApartmentService {
  constructor(apartmentRepository) {
    this.apartmentRepository = apartmentRepository;
  }

  listo(filters = {}) {
    let apartments = this.apartmentRepository.getAll();

    apartments = apartments.map(
      (a) => new Apartment(a.id, a.title, a.city, a.address, a.price, a.isAvailable)
    );

    if (filters.city) {
      apartments = apartments.filter(
        (a) => a.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.isAvailable !== undefined) {
      const available = filters.isAvailable === "true" || filters.isAvailable === true;
      apartments = apartments.filter((a) => a.isAvailable === available);
    }

    return apartments;
  }

  gjejById(id) {
    const apartment = this.apartmentRepository.getById(id);
    if (!apartment) return null;

    return new Apartment(
      apartment.id,
      apartment.title,
      apartment.city,
      apartment.address,
      apartment.price,
      apartment.isAvailable
    );
  }

  shto(data) {
    if (!data.title || data.title.trim() === "") {
      throw new Error("Titulli nuk duhet te jete bosh.");
    }

    if (!data.price || Number(data.price) <= 0) {
      throw new Error("Cmimi duhet te jete me i madh se 0.");
    }

    const apartments = this.apartmentRepository.getAll();
    const newId =
      apartments.length > 0
        ? Math.max(...apartments.map((a) => Number(a.id))) + 1
        : 1;

    const apartment = new Apartment(
      newId,
      data.title,
      data.city,
      data.address,
      data.price,
      data.isAvailable
    );

    return this.apartmentRepository.add(apartment);
  }

  update(id, data) {
    const existing = this.apartmentRepository.getById(id);
    if (!existing) {
      throw new Error("Apartment nuk u gjet.");
    }

    if (data.title !== undefined && data.title.trim() === "") {
      throw new Error("Titulli nuk duhet te jete bosh.");
    }

    if (data.price !== undefined && Number(data.price) <= 0) {
      throw new Error("Cmimi duhet te jete me i madh se 0.");
    }

    const updatedData = {
      ...existing,
      ...data,
      isAvailable:
        data.isAvailable !== undefined
          ? data.isAvailable === true || data.isAvailable === "true"
          : existing.isAvailable,
    };

    return this.apartmentRepository.update(id, updatedData);
  }

  delete(id) {
    const deleted = this.apartmentRepository.delete(id);
    if (!deleted) {
      throw new Error("Apartment nuk u gjet.");
    }

    return true;
  }
}

module.exports = ApartmentService;
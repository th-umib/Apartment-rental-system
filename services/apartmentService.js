const Apartment = require("../Models/apartment");

class ApartmentService {
  constructor(apartmentRepository) {
    this.apartmentRepository = apartmentRepository;
  }

  listo(filters = {}) {
    try {
      let apartments = this.apartmentRepository.getAll();

      apartments = apartments.map(
        (a) =>
          new Apartment(
            a.id,
            a.title,
            a.city,
            a.address,
            a.price,
            a.isAvailable
          )
      );

      if (filters.title) {
        apartments = apartments.filter((a) =>
          a.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }

      if (filters.city) {
        apartments = apartments.filter((a) =>
          a.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }

      if (filters.isAvailable !== undefined && filters.isAvailable !== "") {
        const available =
          filters.isAvailable === "true" || filters.isAvailable === true;
        apartments = apartments.filter((a) => a.isAvailable === available);
      }

      return apartments;
    } catch (error) {
      throw new Error("Gabim gjate filtrimit te apartamenteve.");
    }
  }

  gjejById(id) {
    try {
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
    } catch (error) {
      throw new Error("Gabim gjate kerkimit te apartmentit.");
    }
  }

  shto(data) {
    try {
      if (!data.title || data.title.trim() === "") {
        throw new Error("Titulli nuk duhet te jete bosh.");
      }

      if (isNaN(Number(data.price))) {
        throw new Error("Ju lutem shkruani numer valid.");
      }

      if (Number(data.price) <= 0) {
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
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      const existing = this.apartmentRepository.getById(id);
      if (!existing) {
        throw new Error("Apartmenti nuk u gjet.");
      }

      if (data.title !== undefined && data.title.trim() === "") {
        throw new Error("Titulli nuk duhet te jete bosh.");
      }

      if (data.price !== undefined && isNaN(Number(data.price))) {
        throw new Error("Ju lutem shkruani numer valid.");
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
    } catch (error) {
      throw error;
    }
  }

  delete(id) {
    try {
      const deleted = this.apartmentRepository.delete(id);
      if (!deleted) {
        throw new Error("Apartmenti nuk u gjet.");
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ApartmentService;
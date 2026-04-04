const ApartmentService = require("../Services/apartmentService");

describe("ApartmentService Tests", () => {
  let mockRepository;
  let service;

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new ApartmentService(mockRepository);
  });

  test("shto apartment valid - kthen sukses", () => {
    mockRepository.getAll.mockReturnValue([
      {
        id: 1,
        title: "Old Apartment",
        city: "Prishtine",
        address: "Rruga A",
        price: 200,
        isAvailable: true,
      },
    ]);

    mockRepository.add.mockImplementation((apartment) => apartment);

    const result = service.shto({
      title: "New Apartment",
      city: "Mitrovice",
      address: "Rruga B",
      price: 300,
      isAvailable: true,
    });

    expect(result).not.toBeNull();
    expect(result.title).toBe("New Apartment");
    expect(result.price).toBe(300);
  });

  test("shto apartment me titull bosh - hedh error", () => {
    expect(() => {
      service.shto({
        title: "",
        city: "Prishtine",
        address: "Rruga C",
        price: 150,
        isAvailable: true,
      });
    }).toThrow("Titulli nuk duhet te jete bosh.");
  });

  test("gjej apartment ekzistues sipas id - e kthen apartmentin", () => {
    mockRepository.getById.mockReturnValue({
      id: 1,
      title: "Modern Apartment",
      city: "Ferizaj",
      address: "Rruga Iliria",
      price: 275,
      isAvailable: true,
    });

    const result = service.gjejById(1);

    expect(result).not.toBeNull();
    expect(result.title).toBe("Modern Apartment");
    expect(result.city).toBe("Ferizaj");
  });

  test("gjej apartment qe nuk ekziston - kthen null", () => {
    mockRepository.getById.mockReturnValue(null);

    const result = service.gjejById(999);

    expect(result).toBeNull();
  });

  test("listo me filter sipas city - kthen vetem rezultatet e sakta", () => {
    mockRepository.getAll.mockReturnValue([
      {
        id: 1,
        title: "Modern Apartment",
        city: "Ferizaj",
        address: "A",
        price: 200,
        isAvailable: true,
      },
      {
        id: 2,
        title: "City Flat",
        city: "Prishtine",
        address: "B",
        price: 180,
        isAvailable: true,
      },
      {
        id: 3,
        title: "Sunset Apartment",
        city: "Ferizaj",
        address: "C",
        price: 220,
        isAvailable: false,
      },
    ]);

    const result = service.listo({ city: "Ferizaj" });

    expect(result.length).toBe(2);
    expect(result[0].city).toBe("Ferizaj");
    expect(result[1].city).toBe("Ferizaj");
  });
});
# Sprint 2 Plan — Tringa Hyseni
Data: 1 Prill 2026

## Gjendja Aktuale
- Projekti ka strukturë me shtresa: `Data`, `Models`, `Services`, `UI`, `Docs`, `Middleware`
- Ekziston modeli kryesor `Apartment`
- Janë të implementuara operacionet bazë CRUD për apartamente
- Të dhënat ruhen në file-in `apartments.csv`
- Backend-i është i lidhur me frontend-in për menaxhimin e apartamenteve
- Faqja `apartments.html` shfaq formën dhe listën e apartamenteve

### Çka funksionon tani?
- Leximi i të dhënave nga CSV
- Listimi i apartamenteve në UI
- Shtimi i një apartamenti të ri
- Edit/Update i apartamentit ekzistues
- Delete i apartamentit
- Ruajtja e ndryshimeve në CSV
- Programi ekzekutohet me `npm start`

### Çka nuk funksionon?
- Nuk ka ende feature të re për Sprint 2 si kërkim, filtrim ose statistika
- Error handling nuk është i plotë në të gjitha rastet
- Nuk ka ende mesazhe të qarta për çdo gabim të user-it
- Nuk ka ende unit tests për metodat kryesore
- Kërkimi i apartamenteve sipas qytetit ose titullit nuk është i implementuar në UI

### A kompajlohet dhe ekzekutohet programi?
- Po

## Plani i Sprintit

### Feature e Re (çka do të ndërtosh)
- Do të implementoj **kërkim/filtrim të apartamenteve sipas qytetit dhe titullit**
- Useri do të shkruajë qytetin ose emrin e apartamentit në frontend
- Sistemi do ta filtrojë listën dhe do të shfaqë vetëm apartamentet që përputhen me kërkimin
- Kjo veçori do të kalojë nëpër shtresat:
  - UI merr inputin e user-it
  - Service përpunon logjikën e filtrimit
  - Repository lexon të dhënat nga CSV

### Error Handling (çka do të shtosh)
- Do të trajtoj këto 3 raste specifike:
  - Nëse file `apartments.csv` mungon, sistemi do të tregojë mesazh të qartë dhe do të krijojë file të ri
  - Nëse useri shkruan vlerë jo valide për çmim, sistemi do të tregojë mesazh: “Ju lutem shkruani numër valid”
  - Nëse kërkohet ose editohet një ID që nuk ekziston, sistemi do të tregojë mesazh: “Apartmenti nuk u gjet”
- Programi duhet të vazhdojë punën pa crash

### Teste (çka do të testosh)
- Do të testoj metodat kryesore të `ApartmentService`
- Metodat që do të testohen:
  - `shto(data)`
  - `gjejById(id)`
  - funksioni i ri i kërkimit/filtrimit
- Rastet kufitare që do të kontrollohen:
  - shtimi i apartamentit me titull bosh
  - shtimi i apartamentit me çmim jo valid
  - kërkimi i një apartamenti që ekziston
  - kërkimi i një apartamenti që nuk ekziston

## Afati
- Deadline: Martë, 8 Prill 2026, ora 08:30
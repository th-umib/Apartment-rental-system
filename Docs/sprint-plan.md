# Sprint 2 Plan — Tringa Hyseni

## Gjendja Aktuale

Projekti im është **Apartment Rental System**. Deri në këtë fazë kam ndërtuar bazën funksionale të projektit dhe sistemi është i organizuar me shtresa të ndara si `Data`, `Models`, `Services`, `UI`, `Docs` dhe `Middleware`. Modeli kryesor i projektit është `Apartment`, ndërsa të dhënat ruhen në file-in `apartments.csv`.

Aktualisht projekti ka të implementuara operacionet bazë CRUD për apartamente dhe backend-i është i lidhur me frontend-in. Programi ekzekutohet me `npm start` dhe faqja `apartments.html` shfaq formën dhe listën e apartamenteve.

### Çka funksionon tani?
- Leximi i të dhënave nga `apartments.csv`
- Shfaqja e listës së apartamenteve në frontend
- Shtimi i një apartamenti të ri
- Editimi dhe përditësimi i apartamenteve ekzistuese
- Fshirja e apartamenteve
- Ruajtja e ndryshimeve në CSV
- Lidhja ndërmjet UI → Service → Repository
- Ekzekutimi i projektit përmes `npm start`

### Çka nuk funksionon?
- Nuk ka ende feature të re specifike për Sprint 2
- Nuk është i implementuar kërkimi ose filtrimi i apartamenteve në frontend
- Error handling nuk është ende i plotë për të gjitha rastet
- Nuk ka ende mesazhe të qarta për të gjitha gabimet e mundshme
- Nuk ka ende unit tests për funksionet kryesore të projektit

### A kompajlohet dhe ekzekutohet programi?
- Po

## Plani i Sprintit

### Feature e Re (çka do të ndërtosh)
Në këtë sprint do të implementoj një **feature të re për kërkim/filtrim të apartamenteve sipas qytetit dhe titullit**.

Kjo do të thotë që përdoruesi do të ketë mundësi të shkruajë emrin e qytetit ose një pjesë të titullit të apartamentit në frontend dhe sistemi do ta filtrojë listën duke shfaqur vetëm rezultatet që përputhen me kërkimin.

Kjo veçori do të kalojë nëpër të gjitha shtresat e projektit:
- **UI** do të marrë inputin e përdoruesit
- **Service** do të përmbajë logjikën e filtrimit
- **Repository** do të lexojë të dhënat nga CSV dhe do t’i dërgojë për përpunim

Kjo feature është e dobishme sepse e bën aplikacionin më praktik dhe e ndihmon userin të gjejë më shpejt apartamentin që kërkon.

### Error Handling (çka do të shtosh)
Gjatë këtij sprinti do të përmirësoj edhe trajtimin e gabimeve, në mënyrë që programi të mos crashojë dhe të japë mesazhe më të qarta për userin.

Do të trajtoj këto raste specifike:
- Nëse file `apartments.csv` mungon, sistemi do të tregojë një mesazh të qartë dhe do të krijojë file të ri
- Nëse useri shkruan vlerë jo valide për çmim, sistemi do të tregojë mesazh si: **“Ju lutem shkruani numër valid”**
- Nëse useri kërkon, editon ose fshin një apartment me ID që nuk ekziston, sistemi do të tregojë mesazh si: **“Apartmenti nuk u gjet”**

Qëllimi është që programi të vazhdojë punën pa u mbyllur dhe pa shfaqur gabime të paqarta.

### Teste (çka do të testosh)
Në këtë sprint planifikoj të shtoj teste për funksionet kryesore të `ApartmentService`, sidomos për feature-n e re të kërkimit/filtrimit.

Metodat që do të testohen janë:
- `shto(data)`
- `gjejById(id)`
- funksioni i ri i kërkimit/filtrimit

Rastet kufitare që do të kontrollohen janë:
- shtimi i apartamentit me titull bosh
- shtimi i apartamentit me çmim jo valid
- kërkimi i një apartamenti që ekziston
- kërkimi i një apartamenti që nuk ekziston
- kërkimi me input bosh

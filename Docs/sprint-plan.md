# Sprint 2 Plan — Tringa Hyseni

## Gjendja Aktuale

Projekti im aktualisht është **Apartment Rental System** dhe deri në këtë fazë kam arritur të ndërtoj një bazë funksionale të sistemit. Projekti është i organizuar me shtresa të ndara si `Data`, `Models`, `Services`, `UI`, `Docs` dhe `Middleware`, që do të thotë se struktura kryesore e aplikacionit ekziston dhe është e ndarë në mënyrë logjike.

Modeli kryesor i projektit është **Apartment**, dhe mbi këtë model kam ndërtuar pjesën kryesore të funksionaliteteve. Të dhënat ruhen në file-in `apartments.csv`, prandaj projekti nuk përdor databazë, por ruajtje të të dhënave në file. Kjo pjesë është e lidhur me repository dhe me pjesën e backend-it.

Në këtë moment projekti ka të implementuara operacionet bazë CRUD për apartamente. Kjo do të thotë që useri mund të shohë listën e apartamenteve, të shtojë një apartament të ri, të përditësojë një apartament ekzistues dhe ta fshijë atë. Këto funksione janë të lidhura mes frontend-it, service layer dhe repository, dhe ndryshimet ruhen në CSV.

Programi aktualisht ekzekutohet me `npm start`, backend-i funksionon dhe frontend-i është i lidhur me të. Faqja `apartments.html` shfaq formën për shtim dhe përditësim të apartamenteve, si dhe listën e apartamenteve ekzistuese.

### Çka funksionon tani?

Aktualisht funksionojnë këto pjesë të projektit:

- Leximi i apartamenteve nga file-i `apartments.csv`
- Shfaqja e listës së apartamenteve në frontend
- Shtimi i një apartamenti të ri përmes formës
- Editimi dhe përditësimi i apartamenteve ekzistuese
- Fshirja e apartamenteve nga lista
- Ruajtja automatike e ndryshimeve në file
- Lidhja ndërmjet UI → Service → Repository
- Ekzekutimi i projektit përmes `npm start`

### Çka nuk funksionon?

Edhe pse pjesa bazë e projektit funksionon, ende ka disa gjëra që mungojnë ose nuk janë përfunduar plotësisht.

Së pari, projekti ende nuk ka një **feature të re specifike për Sprint 2**, si kërkim, filtrim, statistika ose sortim. Pjesa aktuale është më shumë CRUD bazë, ndërsa për këtë sprint duhet me u shtu diçka e re që sjell vlerë shtesë për përdoruesin.

Së dyti, **error handling** nuk është ende i plotë në të gjitha rastet. Për shembull, programi duhet të trajtojë më mirë rastet kur file mungon, kur useri jep input jo valid, ose kur kërkohet një ID që nuk ekziston.

Po ashtu, projekti ende nuk ka **unit tests**, prandaj funksionet kryesore nuk janë testuar automatikisht me test project.

Një mungesë tjetër është se useri aktualisht nuk mund të bëjë **kërkim ose filtrim të apartamenteve** sipas qytetit ose titullit direkt nga ndërfaqja. Lista shfaqet, por ende nuk ka mënyrë për ta kufizuar ose filtruar sipas nevojës.

### A kompajlohet dhe ekzekutohet programi?

- Po, programi kompajlohet dhe ekzekutohet.

## Plani i Sprintit

Në këtë sprint do të fokusohem në përmirësimin e projektit përtej CRUD-it bazë. Qëllimi im është që sistemi të mos mbetet vetëm në nivelin e shtimit, leximit, editimit dhe fshirjes së të dhënave, por të ketë edhe një funksionalitet të ri të dobishëm për përdoruesin, si dhe të bëhet më i qëndrueshëm përmes trajtimit më të mirë të gabimeve dhe testimit.

### Feature e Re (çka do të ndërtosh)

Feature që planifikoj të ndërtoj është **kërkimi/filtrimi i apartamenteve sipas qytetit dhe titullit**.

Kjo do të thotë që përdoruesi do të ketë mundësi të shkruajë në frontend emrin e qytetit ose një pjesë të titullit të apartamentit, dhe sistemi do ta filtrojë listën e apartamenteve duke shfaqur vetëm ato që përputhen me kriterin e kërkimit.

Ky funksionalitet është i rëndësishëm sepse e bën aplikacionin më praktik dhe më të dobishëm. Në vend që useri të shohë gjithmonë të gjithë listën, ai do të mund të gjejë më shpejt apartamentin që i nevojitet.

Kjo veçori do të implementohet duke kaluar nëpër të gjitha shtresat e projektit:

- **UI** do të marrë inputin e user-it për kërkim ose filtrim
- **Service** do të përmbajë logjikën e filtrimit sipas qytetit ose titullit
- **Repository** do të lexojë të dhënat nga CSV dhe do t’ia japë service-it për përpunim

Pra, nuk do të jetë vetëm një ndryshim vizual në frontend, por një funksionalitet i plotë që ndjek arkitekturën e projektit.

### Error Handling (çka do të shtosh)

Një pjesë tjetër ku do të fokusohem është përmirësimi i trajtimit të gabimeve. Aktualisht sistemi funksionon, por duhet të bëhet më i sigurt dhe më i qartë për përdoruesin në rastet kur ndodh ndonjë problem.

Do të trajtoj veçanërisht këto raste:

- Nëse file `apartments.csv` mungon, sistemi nuk duhet të crashojë. Në vend të kësaj, do të shfaqet një mesazh i qartë për userin dhe file-i do të krijohet ose do të trajtohet në mënyrë të sigurt.
- Nëse useri jep input jo valid për çmimin, për shembull shkruan tekst në vend të numrit, sistemi duhet të tregojë një mesazh si: **“Ju lutem shkruani numër valid”**.
- Nëse useri kërkon, editon ose fshin një apartament me ID që nuk ekziston, sistemi duhet të tregojë mesazh të qartë si: **“Apartmenti nuk u gjet”**.
- Qëllimi është që programi të mos mbyllet dhe të mos crashojë, por të vazhdojë funksionimin normal edhe kur ndodhin gabime.

Kjo pjesë është e rëndësishme sepse e bën aplikacionin më të qëndrueshëm dhe më të përdorshëm.

### Teste (çka do të testosh)

Për këtë sprint planifikoj të shtoj edhe teste për funksionalitetet kryesore të service layer, sidomos për feature-n e re.

Do të testohen këto metoda dhe raste:

- metoda `shto(data)` për të parë nëse shtimi i një apartamenti valid funksionon si duhet
- metoda `gjejById(id)` për të parë nëse një apartament ekzistues gjendet saktë
- funksioni i ri i kërkimit/filtrimit për të parë nëse kthen vetëm rezultatet që përputhen

Rastet kufitare që dua të kontrolloj janë:

- shtimi i apartamentit me titull bosh
- shtimi i apartamentit me çmim jo valid
- kërkimi i një apartamenti që ekziston
- kërkimi i një apartamenti që nuk ekziston
- kërkimi me input bosh ose input që nuk përputhet me asnjë rekord

Këto teste do të më ndihmojnë të sigurohem që funksionalitetet kryesore po punojnë si duhet dhe që feature-ja e re nuk ka probleme logjike.
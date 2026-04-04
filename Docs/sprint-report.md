# Sprint 2 Report — Tringa Hyseni

## Çka Përfundova

Gjatë këtij sprinti kam arritur të implementoj disa përmirësime të rëndësishme në projektin tim **Apartment Rental System**.

Fillimisht, implementova një **feature të re funksionale për kërkim/filtrim të apartamenteve sipas titullit dhe qytetit**. Kjo veçori i lejon user-it të shkruajë emrin e qytetit ose një pjesë të titullit të apartamentit në frontend, dhe sistemi shfaq vetëm rezultatet që përputhen me kërkimin. Kjo feature u ndërtua duke kaluar nëpër shtresat **UI → Service → Repository**, siç kërkohej në detyrë.

Në frontend shtova fushat për kërkim dhe butonat `Search` dhe `Reset`. Në service layer shtova logjikën për filtrimin sipas `title` dhe `city`, ndërsa repository vazhdon të lexojë të dhënat nga file-i CSV.

Përveç feature-s së re, punova edhe në **error handling**. Shtova trajtim për rastet kur:
- file `apartments.csv` mungon
- useri shkruan çmim jo valid
- useri kërkon ose fshin një apartment me ID që nuk ekziston

Këto raste tash japin mesazhe të qarta dhe programi nuk crashon.

Gjithashtu, shtova **unit tests** për `ApartmentService` duke përdorur **Jest**. Kam krijuar teste për:
- shtim valid të apartmentit
- shtim me titull bosh
- kërkim sipas ID ekzistuese
- kërkim sipas ID jo ekzistuese
- filtrim sipas qytetit

Të gjitha testet kaluan me sukses.

### Screenshot ose output që dëshmon
- Search/filter funksionon në frontend
- Mesazhet e error handling shfaqen si duhet
- `npm test` kalon me sukses me 5 teste të kaluara

## Çka Mbeti

Pjesa kryesore e sprintit është përfunduar, por ka ende disa përmirësime që mund të bëhen në të ardhmen.

- Mund të shtohen feature tjera si statistika, sortim ose eksport
- Frontend-i mund të përmirësohet edhe më shumë në aspektin vizual
- Mund të shtohen më shumë teste për metoda të tjera dhe për më shumë raste kufitare
- Mund të shtohen mesazhe më të avancuara në UI në vend të `alert`

## Çka Mësova

Gjatë këtij sprinti mësova disa gjëra të rëndësishme praktike.

- Mësova si të ndërtoj një feature që kalon nëpër shtresat **UI, Service dhe Repository**
- Mësova si të trajtoj gabimet në mënyrë që programi të mos crashojë
- Mësova si të përdor **Jest** për të testuar logjikën e service layer
- Mësova më mirë si të lidh frontend-in me backend-in përmes `fetch`
- Mësova si ta organizoj më mirë projektin sipas arkitekturës me shtresa
# Project Audit – SmartApart

## 1. Përshkrimi i shkurtër i projektit

SmartApart është një sistem i thjeshtë për menaxhimin dhe rezervimin e banesave me qira. Projekti është ndërtuar për t’u dhënë përdoruesve mundësinë që të shikojnë banesat e disponueshme, të regjistrohen ose të kyçen në sistem, të bëjnë rezervime dhe të dërgojnë kërkesa/inquiries. Përveç pjesës publike, sistemi përfshin edhe një pjesë administrative ku administratori mund të menaxhojë të dhënat kryesore të projektit.

Përdoruesit kryesorë të sistemit janë:
- vizitorët që duan të shikojnë banesa me qira
- përdoruesit e regjistruar që duan të bëjnë rezervime
- administratori që menaxhon apartamentet, rezervimet, përdoruesit dhe kërkesat

Funksionaliteti kryesor i projektit është menaxhimi i listës së banesave dhe ndërveprimi i përdoruesve me sistemin përmes rezervimeve dhe kërkesave. Projekti synon të krijojë një rrjedhë të thjeshtë ku përdoruesi mund të gjejë një banesë, të shohë informacionin për të dhe të ndërmarrë veprimet kryesore pa pasur nevojë për procese të komplikuara.

---

## 2. Çka funksionon mirë?

Pas analizimit të projektit, disa pjesë funksionojnë mirë dhe tregojnë që sistemi ka një bazë të mirë:

1. Projekti ka një ide të qartë dhe funksionale, sepse është i ndërtuar rreth një problemi real: menaxhimi dhe rezervimi i banesave me qira.

2. Sistemi ka ndarje bazike ndërmjet pjesës publike dhe pjesës administrative, gjë që e bën më të lehtë organizimin e funksioneve sipas rolit të përdoruesit.

3. Disa operacione kryesore si shfaqja e banesave, dërgimi i rezervimeve dhe menaxhimi i të dhënave janë të implementuara dhe krijojnë një rrjedhë të përdorshme.

4. Projekti përfshin frontend dhe backend, prandaj nuk është vetëm një paraqitje vizuale, por një sistem me logjikë funksionale.

5. Struktura bazë e projektit ofron mundësi për zgjerime të mëtejshme, sepse sistemi mund të përmirësohet me validime më të mira, organizim më të mirë të kodit dhe dokumentim më profesional.

---

## 3. Dobësitë e projektit

Gjatë auditimit të projektit kam identifikuar disa dobësi reale që ndikojnë në cilësinë dhe mirëmbajtjen e sistemit:

1. Error handling nuk është i njëtrajtshëm në të gjitha pjesët e projektit. Në disa raste gabimet vetëm shfaqen në console ose nuk i jepet përdoruesit një mesazh i qartë.

2. Validimi i inputeve nuk është i mjaftueshëm në çdo formë. Disa fusha mund të pranohen edhe kur janë bosh ose kur përmbajtja e tyre nuk është e saktë.

3. Struktura e kodit në disa pjesë nuk është aq e pastër sa duhet, sepse një pjesë e logjikës mund të jetë e përzier mes frontend-it dhe komunikimit me backend-in.

4. Emërtimi i disa funksioneve, file-ve ose elementeve nuk është plotësisht konsistent, gjë që e bën kodin më të vështirë për t’u lexuar dhe mirëmbajtur.

5. Dokumentimi i projektit nuk është mjaftueshëm i detajuar për dikë që dëshiron ta kuptojë ose ta ekzekutojë projektin pa ndihmë shtesë.

6. Në disa pjesë të UI-së mungon feedback i qartë për përdoruesin pas një veprimi, p.sh. kur një veprim kryhet me sukses ose dështon.

7. Projekti nuk ka testim të mjaftueshëm, prandaj besueshmëria e disa pjesëve varet më shumë nga testimi manual sesa nga një qasje më e strukturuar.

8. Siguria bazike mund të përmirësohet më shumë, sidomos në trajtimin e inputeve dhe në kontrollin më të mirë të gabimeve dhe rrjedhës së të dhënave.

---

## 4. 3 përmirësime që do t’i implementoj

### Përmirësimi 1: Përmirësim i strukturës së kodit dhe heqje e logjikës së panevojshme ose të duplikuar

- **Problemi:** Në disa pjesë të projektit ekziston kod që mund të organizohet më mirë ose që përsëritet, gjë që e bën mirëmbajtjen më të vështirë.
- **Zgjidhja:** Do të riorganizoj pjesë të kodit duke ndarë më qartë logjikën e UI-së nga logjika e përpunimit të të dhënave dhe do të heq pjesë të kodit të duplikuar aty ku është e nevojshme.
- **Pse ka rëndësi:** Ky përmirësim e bën projektin më të lexueshëm, më profesional dhe më të lehtë për zgjerim në të ardhmen.

### Përmirësimi 2: Validim dhe error handling më i mirë

- **Problemi:** Disa inpute nuk kontrollohen mjaftueshëm dhe disa gabime nuk trajtohen në mënyrë të qartë për përdoruesin.
- **Zgjidhja:** Do të shtoj validime më të mira për inputet dhe do të përmirësoj trajtimin e rasteve kur mungojnë të dhënat, kur një ID nuk ekziston ose kur një kërkesë dështon.
- **Pse ka rëndësi:** Kjo e rrit besueshmërinë e sistemit, e bën më të sigurt dhe përmirëson përvojën e përdoruesit.

### Përmirësimi 3: Përmirësim i dokumentimit të projektit

- **Problemi:** Projekti nuk ka dokumentim të mjaftueshëm për ta kuptuar shpejt strukturën, setup-in dhe mënyrën e përdorimit.
- **Zgjidhja:** Do të përmirësoj dokumentimin duke shtuar shpjegime më të qarta në README dhe dokumente shtesë për strukturën dhe funksionimin e projektit.
- **Pse ka rëndësi:** Dokumentimi i mirë e bën projektin më profesional, më të lehtë për vlerësim dhe më të kuptueshëm për përdoruesin ose zhvilluesin tjetër.

---

## 5. Një pjesë që ende nuk e kuptoj plotësisht

Një pjesë që ende nuk e kuptoj plotësisht është organizimi më i avancuar i arkitekturës së projektit, sidomos mënyra më e mirë për ta ndarë logjikën ndërmjet frontend-it, backend-it dhe shtresave të tjera në mënyrë sa më të pastër. E kuptoj funksionimin bazik të rrjedhës së të dhënave, por dua ta kuptoj edhe më mirë si ndërtohet një strukturë më profesionale dhe më e mirëmbajtshme në projekte më të mëdha.

Po ashtu, dua ta kuptoj më qartë se si të ndërtoj një error handling më të plotë dhe më standard në të gjitha pjesët e sistemit, në mënyrë që projekti të jetë më i fortë dhe më i besueshëm edhe në raste gabimesh reale.
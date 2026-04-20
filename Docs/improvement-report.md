# Improvement Report – SmartApart

## Hyrje

Pas auditimit të projektit SmartApart, kam identifikuar disa dobësi reale në strukturën e kodit, në trajtimin e gabimeve, në validimin e inputeve dhe në dokumentim. Qëllimi i këtij improvement sprint nuk ka qenë vetëm të shtoj funksione të reja, por të përmirësoj cilësinë e sistemit ekzistues dhe ta bëj projektin më të qëndrueshëm, më të qartë dhe më profesional.

Në këtë sprint jam fokusuar në 3 përmirësime kryesore që lidhen drejtpërdrejt me strukturën e projektit, reliability-n dhe dokumentimin.

---

## Përmirësimi 1: Përmirësim në strukturën e kodit

### Çka ishte problemi më parë?

Në disa pjesë të projektit, organizimi i kodit nuk ishte aq i qartë sa duhet. Kishte logjikë që mund të ndahej më mirë, si dhe pjesë ku kodi ishte i shpërndarë në mënyrë jo shumë të pastër. Kjo e bënte projektin më të vështirë për t’u lexuar, mirëmbajtur dhe zgjeruar.

### Çfarë ndryshova?

Kam përmirësuar organizimin e kodit duke e ndarë më qartë logjikën sipas përgjegjësive të pjesëve të ndryshme të sistemit. Kam rishikuar emërtimet dhe kam bërë kodin më të kuptueshëm në ato vende ku kishte paqartësi ose strukturë jo të mirë.

Po ashtu, aty ku ka pasur pjesë të përsëritura ose logjikë që mund të organizohej më mirë, i kam rregulluar për ta bërë projektin më të pastër.

### Pse versioni i ri është më i mirë?

Versioni i ri është më i mirë sepse:
- kodi lexohet më lehtë
- mirëmbajtja bëhet më e thjeshtë
- sistemi është më i organizuar
- zgjerimet e ardhshme mund të bëhen më lehtë pa krijuar rrëmujë në projekt

---

## Përmirësimi 2: Përmirësim në reliability, validation dhe error handling

### Çka ishte problemi më parë?

Një nga dobësitë kryesore të projektit ishte se jo në të gjitha rastet inputet kontrolloheshin si duhet. Në disa forma, përdoruesi mund të dërgonte të dhëna jo të plota ose jo të sakta. Gjithashtu, trajtimi i gabimeve nuk ishte gjithmonë i qartë, sidomos kur një kërkesë dështonte ose kur një resurs nuk ekzistonte.

### Çfarë ndryshova?

Kam shtuar kontroll më të mirë të inputeve dhe kam përmirësuar mënyrën si trajtohen gabimet. Në rastet kur mungojnë të dhëna, kur inputi nuk është valid, ose kur ndodh një problem gjatë një kërkese, sistemi tani reagon më qartë.

Kam përmirësuar edhe trajtimin e rasteve kur një element nuk gjendet ose kur ndodh një problem në rrjedhën e sistemit, në mënyrë që përdoruesi të mos mbetet pa informacion se çka ka ndodhur.

### Pse versioni i ri është më i mirë?

Versioni i ri është më i mirë sepse:
- sistemi është më i besueshëm
- gabimet trajtohen më qartë
- përdoruesi merr feedback më të kuptueshëm
- zvogëlohet mundësia që sistemi të pranojë të dhëna të pasakta
- projekti bëhet më stabil në përdorim real

---

## Përmirësimi 3: Përmirësim në dokumentim dhe shpjegueshmëri

### Çka ishte problemi më parë?

Dokumentimi i projektit nuk ishte mjaftueshëm i qartë për dikë që nuk e ka ndërtuar vetë sistemin. Një person tjetër do ta kishte më të vështirë ta kuptonte strukturën e projektit, setup-in fillestar dhe qëllimin e pjesëve kryesore të sistemit.

### Çfarë ndryshova?

Kam përmirësuar dokumentimin e projektit duke shtuar përshkrime më të qarta për strukturën e sistemit, për setup-in dhe për idenë kryesore të projektit. Gjithashtu kam shtuar dokumente si project-audit dhe improvement-report për ta shpjeguar më mirë analizën dhe përmirësimet e realizuara.

### Pse versioni i ri është më i mirë?

Versioni i ri është më i mirë sepse:
- projekti kuptohet më lehtë
- vlerësuesi e sheh më qartë punën e bërë
- dokumentimi tregon qasje më profesionale
- një zhvillues tjetër mund ta kuptojë më shpejt projektin dhe mënyrën si funksionon

---

## Çka mbetet ende e dobët në projekt?

Edhe pas këtyre përmirësimeve, projekti ende ka disa pjesë që mund të përmirësohen më tej.

1. Testimi ende nuk është aq i zhvilluar sa duhet dhe projekti mbështetet shumë në testim manual.
2. UI flow mund të përmirësohet më shumë për ta bërë përvojën e përdoruesit më të qartë dhe më të rrjedhshme.
3. Dokumentimi mund të zgjerohet edhe më shumë me shembuj konkretë, screenshots dhe udhëzime më të hollësishme për përdorim.
4. Siguria bazike mund të forcohet më tej me kontroll më të mirë të inputeve dhe të qasjes në disa pjesë të sistemit.
5. Arkitektura mund të pastrohet edhe më shumë në të ardhmen për ta bërë projektin më afër një zgjidhjeje më profesionale.

---

## Përfundim

Ky improvement sprint më ka ndihmuar ta shoh projektin jo vetëm si një sistem që funksionon, por si një projekt që duhet të analizohet, vlerësohet dhe përmirësohet vazhdimisht. Përmes këtij procesi kam kuptuar më mirë dobësitë reale të sistemit tim dhe rëndësinë që kanë struktura e mirë e kodit, validimi, error handling dhe dokumentimi.

Këto përmirësime e kanë bërë SmartApart më të qartë, më të qëndrueshëm dhe më të lehtë për mirëmbajtje, edhe pse ende ka hapësirë për zhvillim të mëtejshëm.
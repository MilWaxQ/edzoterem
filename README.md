Edzőtermi vizsgaremek dokumentációja


Vizsgaremekünk egy edzőterem webrendszeréről és felépítéséről fog szólni:

A feladat olyan webalkalmazás készítése, amelyben a látogatók tájékozódhatnak az edzőteremről, és jegyeket, illetve bérleteket vásárolhatnak.


Felhasználó bejelentkezés után:
1.: Edzőtermi bérletek vásárlására lesz alkalmas

2.: Személyes adatok megtekintésére alkalmas
3.: A felhasználó be tud jelentkezni személyes adatok alapján, online tudja kezelni a bérletet, illetve tud is online újítani

Felhasználó bejelentkezés elött: 
1.: Galéria ez edzőteremről, megtekinthető a belső felépítése és elrendezése
2.: Megtekinthető lesz az edzőterem nyitvatartása, ünnepi nyitvatartása

A felhasználóknak egy egyéni QR kód van feltüntetve a felhasználó profiljában, amit csak az adott felhasználó tekinthet meg, és ezzel a kóddal tudja megtekinteni a bérlet érvényességét/hátralévő alkalmak számát. 


Az alkalmazásnak reszponzívnak kell lennie, hogy asztali és mobil böngészőben is használható legyen.

Az adatokat egy adatbázisban kell tárolni, amelyet egy API-n keresztül lehet elérni. Az elkészített alkalmazás ezt az API-t hívja az adatok letöltéséhez és módosításához.

Adminisztrációs felület:

Az adatbázis adatain keresztül az admin meg tudja tekinteni a weboldalon kis kártyák formájában a felhasználók adatait (azonosító, név, e-mail, telefonszám, stb.).

Az admin azonosítás után minden jogot megkap, hogy kezelhesse és felülvizsgálhassa a felhasználók adatait.

Adatbázis:
ezeket az adatokat kell tárolnunk
                -felhasznalok:
                                    -id(elsődleges kulcs): A felhasználó azonosítója
                                    -nev: A felhasználó neve
                                    -email: A felhasználó email címe
                                    -jelszo: A felhasználó jelszava(titkosítva)
                                    -telefonszam: A felhasználó telefonszáma
                                    -lakcim: A felhasználó lakcíme
                                    -szuletesiDatum: A felhasználó születési dátuma
                                    -regisztracioDatuma: Mikor regisztrált a felhasználó
                                    -admin: (Boolean) admin-e a felhasználó
                -berletek:
                                    -id(elsődleges kulcs): A bérlet azonosítója
                                    -vasarlasDatuma: A bérlet vásárlásának dátuma
                                    -lejaratDatuma: A bérlet lejáratának dátuma
                                    -alkalom: Háyn alkalom van hátra a bérletből(10 alkalmas esetében)
                                    -lancreakio:(Boolean) kedvezményre jogsult- e
                                    -felhasznaloID: A felhasználó azonosítója
                                    -berlet: Bérlet típusa
              

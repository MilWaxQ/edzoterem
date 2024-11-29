-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 29. 13:55
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `edzoterem`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berletek`
--

CREATE TABLE `berletek` (
  `ID` int(11) NOT NULL,
  `lejarat` date NOT NULL,
  `lancreakcio` tinyint(1) NOT NULL DEFAULT 0,
  `felhasznaloID` int(11) NOT NULL,
  `berletID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `berletek`
--

INSERT INTO `berletek` (`ID`, `lejarat`, `lancreakcio`, `felhasznaloID`, `berletID`) VALUES
(1, '2024-12-23', 0, 1, 1),
(2, '2024-12-30', 1, 2, 2),
(3, '2025-01-03', 0, 3, 3),
(4, '2024-11-27', 2, 4, 4),
(5, '2024-11-28', 3, 5, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `ID` int(11) NOT NULL,
  `nev` text NOT NULL,
  `email` text NOT NULL,
  `jelszo` text NOT NULL,
  `regisztracioDatuma` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`ID`, `nev`, `email`, `jelszo`, `regisztracioDatuma`) VALUES
(1, 'Kis Pista', 'kis.pista@gmail.com', 'titkos', '2024-11-29 13:05:04'),
(2, 'Bangó Margit', 'bangomargitka@gmail.com', 'titkos', '2024-11-29 13:06:57'),
(3, 'Tipp Elek', 'tipp.elek@gmail.com', 'titkos', '2024-11-29 13:07:34'),
(4, 'Kovács Viktor', 'viktorkovacs@gmail.com', 'titkos', '2024-11-29 13:08:27'),
(5, 'Szabó Gizella', 'gizella.szabo@gmail.com', 'titkos', '2024-11-29 13:10:03');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `berletek`
--
ALTER TABLE `berletek`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `berletek`
--
ALTER TABLE `berletek`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

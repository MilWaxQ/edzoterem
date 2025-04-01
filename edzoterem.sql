-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2025 at 01:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edzoterem`
--

-- --------------------------------------------------------

--
-- Table structure for table `berletek`
--

CREATE TABLE `berletek` (
  `ID` varchar(255) NOT NULL,
  `lejaratDatuma` date NOT NULL,
  `alkalom` int(11) NOT NULL DEFAULT 0,
  `berlet` text NOT NULL,
  `lancreakcio` tinyint(1) NOT NULL DEFAULT 0,
  `felhasznaloID` int(11) NOT NULL,
  `vasarlasDatuma` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `berletek`
--

INSERT INTO `berletek` (`ID`, `lejaratDatuma`, `alkalom`, `berlet`, `lancreakcio`, `felhasznaloID`, `vasarlasDatuma`) VALUES
('4b5cfda1-44c9-4348-ada8-668fe7832d84', '2025-04-21', 0, 'Havi bérlet', 0, 16, '2025-03-21'),
('87c53141-24fa-4860-b10e-a72406bc773f', '2025-03-03', 0, 'Negyedéves bérlet', 0, 2, '2024-12-03'),
('eeb712c7-341c-4f30-8bdd-cc312316bf7f', '2025-01-17', 10, '10 alkalmas bérlet', 0, 3, '2024-12-03');

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `ID` int(11) NOT NULL,
  `nev` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `jelszo` text NOT NULL,
  `telefonszam` varchar(255) NOT NULL,
  `lakcim` text NOT NULL,
  `szuletesiDatum` date NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `regisztracioDatuma` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`ID`, `nev`, `email`, `jelszo`, `telefonszam`, `lakcim`, `szuletesiDatum`, `admin`, `regisztracioDatuma`) VALUES
(1, 'Kis Pista', 'kis.pista@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '1', '', '2024-12-03', 1, '2024-11-29 13:05:04'),
(2, 'Bangó Margit', 'bangomargitka@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '2', '', '2024-12-03', 0, '2024-11-29 13:06:57'),
(3, 'Tipp Elek', 'tipp.elek@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '3', '', '2024-12-03', 0, '2024-11-29 13:07:34'),
(4, 'Kovács Viktor', 'viktorkovacs@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '4', '', '2024-12-03', 0, '2024-11-29 13:08:27'),
(5, 'Szabó Gizella', 'gizella.szabo@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '5', '', '2024-12-03', 0, '2024-11-29 13:10:03'),
(16, 'Back Endre', 'backendre@teszt.com', '$2b$10$vBTImqxX0AFW3i82v/eIGufAreU/kZEmB/iv5/JkMncjsnWqjYdg6', '+36123456789', 'Teszt utca 25', '2004-02-29', 0, '2025-03-21 10:05:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `berletek`
--
ALTER TABLE `berletek`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `felhasznaloID` (`felhasznaloID`);

--
-- Indexes for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telefonszam` (`telefonszam`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `berletek`
--
ALTER TABLE `berletek`
  ADD CONSTRAINT `berletek_ibfk_1` FOREIGN KEY (`felhasznaloID`) REFERENCES `felhasznalok` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 10:20 AM
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

CREATE TABLE `felhasznalok` (
  `ID` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `nev` text NOT NULL,
  `email` text NOT NULL,
  `jelszo` text NOT NULL,
  `telefonszam` text NOT NULL,
  `lakcim` text NOT NULL,
  `szuletesiDatum` date NOT NULL DEFAULT '2024-12-03',
  `admin` tinyint(1) NOT NULL,
  `regisztracioDatuma` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `felhasznalok` (`ID`, `nev`, `email`, `jelszo`, `telefonszam`, `lakcim`, `szuletesiDatum`, `admin`, `regisztracioDatuma`) VALUES
(1, 'Kis Pista', 'kis.pista@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '06-22-567-8901', 'Budapest, kisbaba u. 11.', '2024-12-03', 1, '2024-11-29 13:05:04'),
(2, 'Bangó Margit', 'bangomargitka@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '06-33-456-7890', 'Budapest, markoló utca 123.', '2024-12-03', 0, '2024-11-29 13:06:57'),
(3, 'Tipp Elek', 'tipp.elek@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '06-77-314-5433', 'Gyál, makaróni utca 546.', '2024-12-03', 0, '2024-11-29 13:07:34'),
(4, 'Kovács Viktor', 'viktorkovacs@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '06-34-432-1235', 'Budapest, billentyűzet utca 365.', '2024-12-03', 0, '2024-11-29 13:08:27'),
(5, 'Szabó Gizella', 'gizella.szabo@gmail.com', '$2b$10$8XzKzcf5yMjF.fl9LXxIuedhJu87o3dqVsVNseux.ZeMRGbvRIOku', '06-98-765-9873', 'Vecsés, brokkoli utca 122.', '2024-12-03', 0, '2024-11-29 13:10:03');

--
-- Table structure for table `berletek`
--

CREATE TABLE `berletek` (
  `ID` varchar(255) PRIMARY KEY NOT NULL,
  `lejaratDatuma` date NOT NULL,
  `alkalom` int(11) NOT NULL,
  `berlet` text NOT NULL,
  `lancreakcio` tinyint(1) NOT NULL DEFAULT 0,
  `felhasznaloID` int(11) NOT NULL,
  `vasarlasDatuma` date NOT NULL DEFAULT '2024-12-03',
  INDEX(felhasznaloID),
  FOREIGN KEY (`felhasznaloID`) REFERENCES `felhasznalok` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `berletek`
--

INSERT INTO `berletek` (`ID`, `lejaratDatuma`, `alkalom`, `berlet`, `lancreakcio`, `felhasznaloID`, `vasarlasDatuma`) VALUES
('6a349dd2-3513-4cd3-bbf0-f5c2beb029c8', '2025-01-03', 0, 'Havi bérlet', 0, 1, '2024-12-03'),
('87c53141-24fa-4860-b10e-a72406bc773f', '2025-03-03', 0, 'Negyedéves bérlet', 0, 2, '2024-12-03'),
('eeb712c7-341c-4f30-8bdd-cc312316bf7f', '2025-01-17', 10, '10 alkalmas bérlet', 0, 3, '2024-12-03');

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

--
-- Dumping data for table `felhasznalok`
--



--
-- Indexes for dumped tables
--


--
-- AUTO_INCREMENT for dumped tables
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `felhasznalok`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
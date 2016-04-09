-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2016 at 10:51 PM
-- Server version: 5.5.42-37.1-log
-- PHP Version: 5.4.31

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `teriyak1_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `N_Menugroup`
--

DROP TABLE IF EXISTS `N_Menugroup`;
CREATE TABLE IF NOT EXISTS `N_Menugroup` (
  `store` int(11) NOT NULL,
  `id` tinyint(4) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `display_type` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `order_button` tinyint(1) NOT NULL,
  `menus` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pic` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`store`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `N_Menugroup`
--

INSERT INTO `N_Menugroup` (`store`, `id`, `name`, `display_type`, `order_button`, `menus`, `pic`) VALUES
(1, 1, 'SPECIAL', 'main', 1, '71,72,74', 'SpicyChicken.jpg'),
(1, 2, 'TERIYAKI', 'main', 1, '1,2,3,4,5,6', 'SpicyChicken.jpg'),
(1, 4, 'YAKISOBA', 'main', 1, '16,17,18,19,20,21', 'Yakisoba.jpg'),
(1, 5, 'STIR-FRY', 'main', 1, '22,24,25,28,29', 'SpicyMushroom.jpg'),
(1, 6, 'FRIED RICE', 'main', 1, '30,31,32,33,34,35', 'FriedRice.jpg'),
(1, 7, 'VEGITERIAN', 'main', 1, '29,37,38,39,17,18,31,32', 'VeggieStir.jpg'),
(1, 8, 'SIDE ORDER', 'side', 1, '40,41,42,43,44,45,46,47,48,49,50,51', 'Gyoza.jpg'),
(1, 3, 'DEEP-FRY', 'main', 1, '9,10,11,12,13', 'Katsu.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

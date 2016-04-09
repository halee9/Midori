-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2016 at 10:52 PM
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
-- Table structure for table `N_Options`
--

DROP TABLE IF EXISTS `N_Options`;
CREATE TABLE IF NOT EXISTS `N_Options` (
  `store` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `abbr_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Dumping data for table `N_Options`
--

INSERT INTO `N_Options` (`store`, `id`, `code`, `name`, `price`, `abbr_name`) VALUES
(1, 1, 'CH', 'Extra Chicken', '3.50', 'ex ch'),
(1, 2, 'BR', 'Extra Chicken Breast', '3.50', 'ex brst'),
(1, 3, 'BF', 'Extra Beef', '4.50', 'ex bf'),
(1, 4, 'PK', 'Extra Pork', '4.00', 'ex pk'),
(1, 5, 'KT', 'Extra Katsu', '3.50', 'ex katsu'),
(1, 6, 'SH', 'Extra Shrimp', '4.00', 'ex shrimp'),
(1, 7, 'TF', 'Extra Tofu', '2.00', 'ex tofu'),
(1, 8, 'VG', 'Extra Vegetables', '2.00', 'ex veg'),
(1, 9, 'BC', 'Extra General Tso''s Chicken', '3.50', 'ex gen'),
(1, 10, 'BC', 'Extra Sweet and Sour Chicken', '3.50', 'ex s+s'),
(1, 11, 'KS', 'Extra Katsu Sauce (2 oz)', '0.50', 'ex ks sauce'),
(1, 12, 'TS', 'Extra Teriyaki Sauce (2 oz)', '0.50', 'ex t sauce'),
(1, 13, 'SD', 'Extra Salad Dressing (2 oz)', '0.50', 'ex salad dressing');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

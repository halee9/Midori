-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2016 at 10:53 PM
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
-- Table structure for table `Store`
--

DROP TABLE IF EXISTS `Store`;
CREATE TABLE IF NOT EXISTS `Store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `state` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `zip` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `phone` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `text_phone` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `text_phone_company` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fax` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tax_rate` decimal(4,2) NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `type` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `pickup_interval_time` tinyint(4) NOT NULL,
  `business_days` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `business_hours_from` time NOT NULL,
  `business_hours_to` time NOT NULL,
  `forced_closed` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N',
  `cashier_id` int(11) NOT NULL,
  `cashier_phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `cashier_text` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Y',
  `cashier_carrier` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `open_status` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Store`
--

INSERT INTO `Store` (`id`, `name`, `address`, `city`, `state`, `zip`, `phone`, `text_phone`, `text_phone_company`, `fax`, `email`, `logo`, `tax_rate`, `date_created`, `date_updated`, `type`, `pickup_interval_time`, `business_days`, `business_hours_from`, `business_hours_to`, `forced_closed`, `cashier_id`, `cashier_phone`, `cashier_text`, `cashier_carrier`, `open_status`) VALUES
(1, 'MIDORI TERIYAKI', '1120 Howell St.', 'Seattle', 'WA', '98101', '2066247273', '2069724011', 'ATT', '2064674563', 'halee9@gmail.com', '', '9.50', '2011-09-29 22:07:37', '2011-09-29 22:07:37', 'A', 15, '1,2,3,4,5', '10:00:00', '16:00:00', 'S', 1, '2069724011', 'N', 'AT&T', 'N');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 08, 2016 at 10:50 PM
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
-- Table structure for table `N_Menu`
--

DROP TABLE IF EXISTS `N_Menu`;
CREATE TABLE IF NOT EXISTS `N_Menu` (
  `store` int(11) NOT NULL,
  `id` smallint(6) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pic` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `combination` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N',
  `short_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `options` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `abbr_name` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `is_spicy` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `side_type` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `option_display` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `spicy_option` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `breast_option` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `extra_option` char(1) COLLATE utf8_unicode_ci NOT NULL,
  `extra_code` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `soldout` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'N',
  `job` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Grill',
  PRIMARY KEY (`store`,`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `N_Menu`
--

INSERT INTO `N_Menu` (`store`, `id`, `name`, `pic`, `description`, `price`, `combination`, `short_name`, `options`, `abbr_name`, `is_spicy`, `side_type`, `option_display`, `spicy_option`, `breast_option`, `extra_option`, `extra_code`, `soldout`, `job`) VALUES
(1, 1, 'Spicy Chicken', 'SpicyChicken.jpg', 'Spicy chicken with rice', '7.99', 'Y', 'Chicken', '1,2,3,7,8,20', 'SP T', 'Y', '2R', 'Y', 'Y', 'N', 'Y', 'CH', 'N', 'Wok'),
(1, 2, 'Teriyaki Chicken', 'Chicken.jpg', 'Teriyaki chicken with rice', '7.99', 'N', '', '1,2,3,7,8,20', 'CH T', 'N', '2R', 'Y', 'N', 'N', 'Y', 'CH', 'N', 'Grill'),
(1, 3, 'Chicken Breast', 'NoImage.jpg', 'Teriyaki chicken breast with rice', '8.99', 'Y', 'Chicken Breast', '1,2,3,7,8,19,21', 'BRST', 'N', '2R', 'Y', 'Y', 'N', 'Y', 'BR', 'N', 'Grill'),
(1, 4, 'Bulgogi Beef', 'BulgogiBeef.jpg', 'Korean style beef stir-fry with vegetables, rice', '9.99', 'Y', 'Beef T', '1,2,3,7,8,19,22', 'BF', 'N', '2R', 'Y', 'Y', 'N', 'Y', 'BF', 'N', 'Wok'),
(1, 5, 'Spicy Pork', 'SpicyPork.jpg', 'Stir-fried spicy pork and onions with rice', '8.99', 'Y', 'Pork', '1,2,3,7,8,19,23', 'Sp-PK', 'N', '2R', 'Y', 'Y', 'N', 'Y', 'PK', 'N', 'Wok'),
(1, 6, 'Salmon', 'Salmon.jpg', 'Grilled fresh salmon with rice', '10.99', 'N', '', '1,2,3,7,8', 'Salmon', 'N', '2R', 'Y', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 9, 'Chicken Katsu', 'Katsu.jpg', 'Deep-fried Japanese style breaded chicken with rice', '8.99', 'Y', 'Katsu', '1,2,3,7,8,24', 'Katsu', 'N', '2R', 'Y', 'N', 'N', 'Y', 'KT', 'N', 'Grill'),
(1, 10, 'Gyoza Plate', 'NoImage.jpg', '10 pieces chicken gyoza with rice', '7.99', 'Y', 'Gyoza', '1,2,3,7,8', 'GZ PL', 'N', '2R', 'Y', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 11, 'Crispy Chicken', 'NoImage.jpg', 'Deep-fried chicken with rice', '8.99', 'N', '', '1,2,3,7,8,10,19', 'Crispy', 'N', '2R', 'Y', 'N', 'N', 'N', 'CH', 'N', 'Grill'),
(1, 12, 'General Tso Chicken', 'NoImage.jpg', 'Spicy deep-fried chicken with rice', '8.99', 'N', '', '1,2,3,7,8,10,19', 'Gen', 'N', '2R', 'Y', 'N', 'N', 'N', 'CH', 'N', 'Wok'),
(1, 13, 'Tofu Teriyaki', 'NoImage.jpg', 'Deep-fried tofu with rice', '7.99', 'N', '', '1,2,3,7,8,10,15,17', 'Tofu T', 'N', '2R', 'Y', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 16, 'Yakisoba Chicken', 'Yakisoba.jpg', 'Stir-fried Japanese yakisoba noodle, chicken, broccoli, mushroom, onion, carrot and cabbage. Served with one scoop of rice', '8.99', 'N', '', '', 'CH Yaki', 'N', '1R', 'Y', 'Y', 'Y', 'Y', 'CH', 'N', 'Wok'),
(1, 17, 'Yakisoba Tofu', 'Yakisoba.jpg', 'Stir-fried Japanese yakisoba noodle, fried tofu, broccoli, mushroom, onion, carrot and cabbage. Served with one scoop of rice', '8.99', 'N', '', '', 'Tofu Yaki', 'N', '1R', 'Y', 'Y', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 18, 'Yakisoba Veggie', 'Yakisoba.jpg', 'Stir-fried Japanese yakisoba noodle, broccoli, mushroom, onion, carrot and cabbage. Served with one scoop of rice', '8.99', 'N', '', '', 'Veg Yaki', 'N', '1R', 'Y', 'Y', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 19, 'Yakisoba Beef', 'Yakisoba.jpg', 'Stir-fried Japanese yakisoba noodle, beef, broccoli, mushroom, onion, carrot and cabbage. Seved with one scoop of rice', '9.99', 'N', '', '', 'Beef Yaki', 'N', '1R', 'Y', 'Y', 'N', 'Y', 'BF', 'N', 'Wok'),
(1, 20, 'Yakisoba Pork', 'Yakisoba.jpg', 'Stir-fried Japanese yakisoba noodle, pork, broccoli, mushroom, onion, carrot and cabbage. Seved with one scoop of rice', '9.99', 'N', '', '', 'Pork Yaki', 'N', '1R', 'Y', 'Y', 'N', 'Y', 'PK', 'N', 'Wok'),
(1, 21, 'Yakisoba Shrimp', 'Yakisoba.jpg', 'Stir-fried Japanese yakisoba noodle, shrimp, broccoli, mushroom, onion, carrot and cabbage. Served with one scoop of rice', '10.49', 'N', '', '', 'Shrimp Yak', 'N', '1R', 'Y', 'Y', 'N', 'Y', 'SH', 'N', 'Wok'),
(1, 22, 'Spicy Chicken & Mushroom', 'SpicyMushroom.jpg', 'Stir-fried chicken, lots of mushroom, broccoli, onion, carrot and cabbage with hot spicy teriyaki source. Served with rice', '8.99', 'N', '', '', 'SP+M', 'Y', '2R', 'Y', 'N', 'Y', 'Y', 'CH', 'N', 'Wok'),
(1, 24, 'Kung Pao Chicken', 'KungPao.jpg', 'Stir-fried chicken, peanuts, onion, carrot, mushroom, geen onion and broccoli with kung pao sauce. Served with rice', '8.99', 'N', '', '', 'Kung', 'Y', '2R', 'Y', 'N', 'Y', 'Y', 'CH', 'N', 'Wok'),
(1, 25, 'Broccoli Chicken', 'BroccoliChicken.jpg', 'Stir-fried chicken, lots of broccoli, onion and carrot with house soy sauce. Served with rice', '8.99', 'N', '', '', 'CH+Broc', 'N', '2R', 'Y', 'Y', 'Y', 'Y', 'CH', 'N', 'Wok'),
(1, 28, 'Veggie Stir Fry Chicken', 'VeggieStir.jpg', 'Stir-fried chicken, cabbage, broccoli, mushroom, onion and carrot with house soy sauce. Served with rice', '8.99', 'N', '', '', 'Vegi CH', 'N', '2R', 'Y', 'Y', 'Y', 'Y', 'CH', 'N', 'Wok'),
(1, 29, 'Veggie Stir Fry Tofu', 'VeggieStir.jpg', 'Stir-fried tofu, cabbage, broccoli, mushroom, onion and carrot with house soy sauce. Served with rice', '8.99', 'N', '', '', 'Vegi Tofu', 'N', '2R', 'Y', 'Y', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 30, 'Fried Rice Chicken', 'FriedRice.jpg', 'Stir-fried rice, chicken, egg, corn, green bean with house soy sauce', '8.99', 'N', '', '', 'CH F-R', 'N', 'NO', 'Y', 'Y', 'Y', 'Y', 'CH', 'N', 'Wok'),
(1, 31, 'Fried Rice Tofu', 'FriedRice.jpg', 'Stir-fried rice, fried tofu, egg, corn, green bean with house soy sauce', '8.99', 'N', '', '', 'Tofu F-R', 'N', 'NO', 'Y', 'Y', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 32, 'Fried Rice Veggies', 'FriedRice.jpg', 'Stir-fried rice, broccoli, mushroom, egg, corn, green bean with house soy sauce', '8.99', 'N', '', '', 'Tofu F-R', 'N', 'NO', 'Y', 'Y', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 33, 'Fried Rice Beef', 'FriedRice.jpg', 'Stir-fried rice, beef, egg, corn, green bean with house soy sauce', '9.99', 'N', '', '', 'Beef F-R', 'N', 'NO', 'Y', 'Y', 'N', 'Y', 'BF', 'N', 'Wok'),
(1, 34, 'Fried Rice Pork', 'FriedRice.jpg', 'Stir-fried rice, pork, egg, corn, green bean with house soy sauce', '9.99', 'N', '', '', 'Pork F-R', 'N', 'NO', 'Y', 'Y', 'N', 'Y', 'PK', 'N', 'Wok'),
(1, 35, 'Fried Rice Shrimp', 'FriedRice.jpg', 'Stir-fried rice, shrimp, egg, corn, green bean with house soy sauce', '10.49', 'N', '', '', 'Shrimp F-R', 'N', 'NO', 'Y', 'Y', 'N', 'Y', 'SH', 'N', 'Wok'),
(1, 37, 'Spicy Tofu & Mushroom', 'SpicyMushroom.jpg', 'Stir-fried tofu, lots of mushroom, broccoli, onion, carrot and cabbage with hot spicy teriyaki source. Served with rice', '8.99', 'N', '', '', 'SP Tofu+M', 'N', '2R', 'Y', 'N', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 39, 'Kung Pao Tofu', 'KungPao.jpg', 'Stir-fried tofu, peanuts, onion, carrot, mushroom, geen onion and broccoli with kung pao sauce. Served with rice', '8.99', 'N', '', '', 'Kung Tofu', 'N', '2R', 'Y', 'N', 'N', 'Y', 'TF', 'N', 'Wok'),
(1, 40, 'Gyoza - 8 piece', 'Gyoza.jpg', 'Deep fried pot stickers stuffed with vegetables and pork', '3.99', 'N', '', '', '8pc GZ', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 41, 'Gyoza - 4 piece', 'Gyoza.jpg', 'Deep fried pot stickers stuffed with vegetables and pork', '1.99', 'N', '', '', '4pc GZ', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 42, 'Egg Roll - 2 piece', 'Eggroll.jpg', 'Deep fried egg rolls stuffed with vegetables and pork', '3.99', 'N', '', '', '2pc Egg', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 43, 'Egg Roll - 1 piece', 'Eggroll.jpg', 'Deep fried egg rolls stuffed with vegetables and pork', '1.99', 'N', '', '', '1pc Egg', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 44, 'Side Broccoli', 'Broccoli.jpg', 'Steamed broccoli', '2.99', 'N', '', '', 'Side Broc', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Wok'),
(1, 45, 'Romaine Lettuce Salad', 'NoImage.jpg', 'Romaine lettuce with house dressing', '0.99', 'N', '', '', 'Side Salad', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 46, 'Side White Rice', 'NoImage.jpg', 'Steamed bowl of white rice', '1.99', 'N', '', '', 'Side White', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 47, 'Side Brown Rice', 'NoImage.jpg', 'Steamed bowl of brown rice', '1.99', 'N', '', '', 'Side Brown', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 48, 'Edamane', 'Edamame.jpg', 'Steamed edamame', '3.49', 'N', '', '', 'Edamame', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 49, 'Kimchi', 'Kimchi.jpg', 'Fermented Korean side dish made of vegetables with many seasonings', '2.49', 'N', '', '', 'Kimchi', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 50, 'Seaweed Salad', 'Seaweed.jpg', '', '2.49', 'N', '', '', 'Seaweed', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 51, 'Roasted Seaweed', 'Gim.jpg', '', '2.99', 'N', '', '', 'Gim', 'N', 'NO', 'N', 'N', 'N', 'N', '', 'N', 'Grill'),
(1, 71, 'Spicy Chicken Combo', 'SpicyChicken.jpg', 'Spicy Chicken with 4 pieces Gyoza', '9.99', 'N', '', '', 'SP+GZ', 'N', '2R', 'N', 'N', 'N', 'Y', 'CH', 'N', 'Wok'),
(1, 72, 'Teriyaki Chicken Combo', 'NoImage.jpg', 'Teriyaki Chicken with 4 pieces Gyoza', '9.99', 'N', '', '', 'CH+GZ', 'N', '2R', 'N', 'N', 'N', 'Y', 'CH', 'N', 'Grill'),
(1, 73, 'General Chicken Combo', 'NoImage.jpg', 'General Chicken with 4 pieces Gyoza', '10.99', 'N', '', '', 'Gen+GZ', 'N', '2R', 'N', 'N', 'N', 'Y', 'CH', 'Y', 'Wok'),
(1, 74, 'Crispy Chicken Combo', 'NoImage.jpg', 'Crispy Chicken with 4 pieces Gyoza', '9.99', 'N', '', '', 'Crisp+GZ', 'N', '2R', 'N', 'N', 'N', 'Y', 'CH', 'N', 'Grill');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

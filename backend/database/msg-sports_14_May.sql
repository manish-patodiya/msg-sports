-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2024 at 11:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `msg-sports`
--
CREATE DATABASE IF NOT EXISTS `msg-sports` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `msg-sports`;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(10) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `game_id` varchar(50) NOT NULL,
  `date_time` datetime NOT NULL,
  `venue` text NOT NULL,
  `photo` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `event_name`, `game_id`, `date_time`, `venue`, `photo`, `created_at`, `updated_at`, `deleted_at`) VALUES
(6, 'MSG Premier League', '15', '2024-06-11 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715058547837-895430652.jpeg', '2024-05-07 10:39:07', '2024-05-07 10:39:07', NULL),
(7, 'Shuttle Smash Showdown', '17', '2024-06-12 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715058645534-893834742.webp', '2024-05-07 10:40:45', '2024-05-07 10:40:45', NULL),
(8, 'Goal Rush Championship', '16', '2024-06-13 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715058742934-693105303.jpg', '2024-05-07 10:42:22', '2024-05-07 10:42:22', NULL),
(9, 'Table Soccer Face-off', '18', '2024-06-14 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715058848976-558546526.jpg', '2024-05-07 10:44:08', '2024-05-07 10:44:08', NULL),
(10, 'Corner Pocket Classic', '19', '2024-06-15 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715060694977-837551678.jpeg', '2024-05-07 11:14:54', '2024-05-07 11:14:54', NULL),
(11, 'Checkmate Masters Tournament', '20', '2024-06-16 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715061191682-198422429.jpg', '2024-05-07 11:22:08', '2024-05-07 11:22:08', NULL),
(15, 'Ping Pong Palooza', '21', '2024-06-17 10:30:00', 'Block 15, 2nd Floor, Pritech Park Annex, Outer Ring Road Varthur Hobli, Bellandur Village, Bangalore – 560103', 'event_image-1715061660064-79267691.jpg', '2024-05-07 11:31:00', '2024-05-07 11:31:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `game_name` varchar(50) NOT NULL,
  `game_description` text NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `deleted_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `game_name`, `game_description`, `created_at`, `deleted_at`) VALUES
(15, 'Cricket', 'A bat-and-ball game played between two teams of eleven players on a circular field with a rectangular 22-yard-long pitch in the center. The batting team tries to score runs by hitting the ball thrown by the bowler, while the bowling and fielding team try to dismiss the batsmen and restrict the scoring.', '2024-05-07', NULL),
(16, 'Football (Soccer)', ' A team sport played between two teams of eleven players with a spherical ball. The objective is to score goals by getting the ball into the opposing team\'s goal, usually without using hands or arms (except for the goalkeeper).', '2024-05-07', NULL),
(17, 'Badminton', 'A racquet sport played on a rectangular court divided by a net. Players or teams score points by hitting a shuttlecock over the net and into the opponent\'s court. The game can be played in singles (one player per side) or doubles (two players per side).', '2024-05-07', NULL),
(18, 'Foosball', 'A table-top game that simulates soccer, played on a rectangular table with rows of miniature figures mounted on rotating bars. Players manipulate the rods to kick the ball into the opponent\'s goal.', '2024-05-07', NULL),
(19, 'Carrom', 'A tabletop game that is a blend of billiards and shuffleboard. Players use a striker to pot their own carrom men (playing pieces) into the four corner pockets of the board, while also trying to block their opponent from doing the same.', '2024-05-07', NULL),
(20, 'Chess', 'A two-player strategy board game played on an 8x8 grid. Each player starts with sixteen pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The objective is to checkmate the opponent\'s king, putting it under an inescapable threat of capture.', '2024-05-07', NULL),
(21, 'Table Tennis', 'Also known as ping pong, it is a fast-paced game played on a rectangular table divided by a net. Players use paddles to hit a lightweight ball back and forth across the table, aiming to score points by making the ball land on the opponent\'s side.', '2024-05-07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `games_categories`
--

DROP TABLE IF EXISTS `games_categories`;
CREATE TABLE `games_categories` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games_categories`
--

INSERT INTO `games_categories` (`id`, `category`) VALUES
(1, 'Single'),
(2, 'Double'),
(3, 'Team');

-- --------------------------------------------------------

--
-- Table structure for table `games_rating`
--

DROP TABLE IF EXISTS `games_rating`;
CREATE TABLE `games_rating` (
  `id` int(11) NOT NULL,
  `user_id` int(4) NOT NULL,
  `game_id` int(4) NOT NULL,
  `rating` tinyint(1) NOT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games_rating`
--

INSERT INTO `games_rating` (`id`, `user_id`, `game_id`, `rating`, `status`) VALUES
(50, 1, 15, 5, NULL),
(51, 1, 16, 2, NULL),
(52, 1, 17, 3, NULL),
(53, 1, 18, 3, NULL),
(54, 1, 19, 4, NULL),
(55, 1, 20, 4, NULL),
(56, 1, 21, 4, NULL),
(57, 9, 15, 4, NULL),
(58, 9, 16, 3, NULL),
(59, 9, 17, 3, NULL),
(60, 9, 18, 1, NULL),
(61, 9, 19, 3, NULL),
(62, 9, 20, 2, NULL),
(63, 9, 21, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
CREATE TABLE `houses` (
  `id` tinyint(2) NOT NULL,
  `house_name` varchar(50) NOT NULL,
  `house_description` text NOT NULL,
  `background` varchar(20) NOT NULL,
  `image` text NOT NULL,
  `cap_id` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`id`, `house_name`, `house_description`, `background`, `image`, `cap_id`) VALUES
(1, 'Orange House', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident', '#ef6c00', 'house_image-1714300000035-771710982.jpeg', NULL),
(2, 'Red House', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident', '#c62828', 'house_image-1714299446551-550679770.jpeg', NULL),
(3, 'Purple House', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident', '#6a1b9a', 'house_image-1714299750797-993440087.jpeg', 5),
(4, 'Green House', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident', '#2e7d32', 'house_image-1714299820684-222549592.jpeg', NULL),
(5, 'Yellow House', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident', '#f9a825', 'house_image-1714299872889-982034474.jpeg', NULL),
(6, 'Pink House', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident', '#ad1457', 'house_image-1714299957973-835486661.webp', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` tinyint(1) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'captain'),
(3, 'player');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` text DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `twitter` varchar(50) DEFAULT NULL,
  `facebook` varchar(50) DEFAULT NULL,
  `instagram` varchar(50) DEFAULT NULL,
  `banners` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `about_title` varchar(20) DEFAULT NULL,
  `about_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `name`, `contact`, `email`, `address`, `website`, `twitter`, `facebook`, `instagram`, `banners`, `about_title`, `about_description`) VALUES
(1, 'msg-sports', '+91 9999999999', 'msg-sports@msg-global.com', 'msg global solutions, ag Thurgauerstrasse 39, 8050 Zürich/Oerlikon, Switzerland', '', '', '', '', '[{\"image\":\"banner_image-1714240376572-90003065.jpg\",\"show\":true},{\"image\":\"banner_image-1714240381901-362411692.jpeg\",\"show\":true},{\"image\":\"banner_image-1714240386968-591960652.jpeg\",\"show\":true},{\"image\":\"banner_image-1714366705594-159846454.jpg\",\"show\":false},{\"image\":\"banner_image-1715591960011-677937365.jpeg\",\"show\":false}]', 'msg sports', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam ut laborum cum architecto itaque dolores delectus obcaecati expedita quos temporibus aliquid atque mollitia unde labore, ullam autem! Rerum cupiditate pariatur saepe, tempora, quod totam dolorem eum voluptates enim, facere hic delectus perspiciatis inventore nostrum exercitationem consequatur maxime consectetur');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `business_unit` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `emp_id` varchar(15) NOT NULL,
  `sold_amt` int(5) NOT NULL,
  `house_id` int(4) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0:pending\r\n1:Approved\r\n2:Rejected',
  `tshirt` varchar(3) NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `contact`, `business_unit`, `location`, `emp_id`, `sold_amt`, `house_id`, `password`, `profile`, `status`, `tshirt`, `is_completed`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Manish Patodiya', 'manish.patodiya@msg-global.com', '9602065385', 'RI&E', 'Bangalore', 'INT26', 10, 1, '$2a$08$i8PFcmSmaOX/pk/EcEz/L.4mwq4BlBYvxYXN6EtVr44nLo4v1g9Um', 'profile_photo-1715233104738-827982709.jpg', 1, 'M', 1, '2024-05-01 13:53:29', '2024-05-14 14:14:51', NULL),
(2, 'Mahesh', 'mahesh@msg-global.com', '9999999999', '', '', '', 0, 0, '$2a$08$LkFpeywwsZHeNUafxRnJ9.7HljdTBLJOK4VQQvTpRnFcovFnS5ehi', NULL, 1, '', 0, '2024-05-01 18:23:49', '2024-05-01 18:23:49', NULL),
(3, 'Manoj', 'manoj@msg-global.com', '9999999998', '', '', '', 0, 0, '$2a$08$5rY2IUhVghH1atFqCMkQu.uDsMRkAvpNlikloY9KOvJyB7FpQj1Ba', NULL, 2, '', 0, '2024-05-01 18:24:39', '2024-05-01 18:24:39', NULL),
(4, 'Sameer', 'sameer@msg-global.com', '9999999997', '', '', '', 0, 0, '$2a$08$BZNi4NrKMds1mQc0yp0Mz.RXLKQsfIt8TpujCAepKbXTO9tj00sIC', NULL, 2, '', 0, '2024-05-01 18:25:31', '2024-05-01 18:25:31', NULL),
(5, 'Arun', 'arun@msg-global.com', '9999999996', '', '', '', 0, 3, '$2a$08$2.L7u0enxu2Y6DP7Cwr1a.kcLNPM7qJqPbzgJTcojefG2d2ugXWPm', NULL, 1, '', 0, '2024-05-01 18:26:05', '2024-05-01 18:26:05', NULL),
(6, 'Anurag', 'anurag@msg-global.com', '9999999995', '', '', '', 0, 0, '$2a$08$erBYJallrbn1V6vii1g70ez.Msux9s8JdE48x7P0vpYDqQdzz9zQG', NULL, 1, '', 0, '2024-05-01 18:26:38', '2024-05-01 18:26:38', NULL),
(7, 'Yashash', 'yashash@msg-global.com', '9999999994', '', '', '', 0, 0, '$2a$08$6uc6NUwNkTc/9At4GKFNbOFFDGk7QfVAOj2m1pLj9li6VZwca4OFK', NULL, 1, '', 0, '2024-05-01 18:27:15', '2024-05-01 18:27:15', NULL),
(8, 'Sidharth', 'sidharth@msg-global.com', '9999999993', '', '', '', 0, 0, '$2a$08$j6WO3SrAIlI/yIaRq4nWuuVi91XrMErL.YtsxfAzP.EuSkKstXKJi', NULL, 0, '', 0, '2024-05-01 18:28:28', '2024-05-01 18:28:28', NULL),
(9, 'Neivedhya', 'neivedhya@msg-global.com', '9999999992', 'DigitalX', 'Bangalore', 'INT33', 0, 0, '$2a$08$1X5y5ZU/sZCh5r9elqFvT.a4n65v1n4dSHMbz3RZfOblFSRi7mPT.', 'profile_photo-1715329204212-351581330.jpg', 1, 'M', 1, '2024-05-01 18:29:23', '2024-05-01 18:29:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
CREATE TABLE `users_role` (
  `id` int(11) NOT NULL,
  `user_id` int(4) NOT NULL,
  `role_id` tinyint(1) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_role`
--

INSERT INTO `users_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 3),
(3, 1, 1),
(4, 2, 3),
(5, 3, 3),
(6, 4, 3),
(7, 5, 3),
(8, 6, 3),
(9, 7, 3),
(10, 8, 3),
(11, 9, 3),
(29, 5, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `photo` (`photo`) USING HASH;

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games_categories`
--
ALTER TABLE `games_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games_rating`
--
ALTER TABLE `games_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`contact`);

--
-- Indexes for table `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `games_categories`
--
ALTER TABLE `games_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `games_rating`
--
ALTER TABLE `games_rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

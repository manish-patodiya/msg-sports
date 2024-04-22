-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2024 at 02:34 PM
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
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `venue` text NOT NULL,
  `photo` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `frontend_settings`
--

DROP TABLE IF EXISTS `frontend_settings`;
CREATE TABLE `frontend_settings` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(13) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `about` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `frontend_settings`
--

INSERT INTO `frontend_settings` (`id`, `name`, `logo`, `about`) VALUES
(1, 'msg-sports', '', '');

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `emp_id` int(10) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(25) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `profile` varchar(100) DEFAULT NULL,
  `role_id` tinyint(1) NOT NULL DEFAULT 3,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0:pending\r\n1:Approved\r\n2:Rejected',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `emp_id`, `name`, `email`, `phone`, `password`, `profile`, `role_id`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(21, NULL, '', 'patodiya@msg-global.com', NULL, '$2a$08$3IuoqEqzthjHglZBhTUJCeYqOyqoZiMjMgCozdi3GLOcAKO/QmsSm', NULL, 3, 0, '2024-04-19 16:53:36', '2024-04-19 16:53:36', NULL),
(24, NULL, '', 'paodiya@msg-global.com', NULL, '$2a$08$cf8/SBKhvtTC9KhbP6.9TeziNT2ubXJa1b8Bml5HzlIFtQt9YUpam', NULL, 3, 0, '2024-04-19 17:00:58', '2024-04-19 17:00:58', NULL),
(66, NULL, '', 'padiya@msg-global.com', NULL, '$2a$08$zgviI4sp5tofsm5eS/JkL.wHOXGBr32jkyGybCiMoFuL3.YvDkDxa', NULL, 3, 0, '2024-04-20 15:16:59', '2024-04-20 15:16:59', NULL),
(69, NULL, '', 'padia@msg-global.com', NULL, '$2a$08$XhHe5DavWuktgIu7UM6eY.kfbv.riocTsGXvLt9IjzUBu.gLPPMNO', NULL, 3, 0, '2024-04-20 15:24:35', '2024-04-20 15:24:35', NULL),
(76, NULL, '', 'mahesh@msg-global.com', NULL, '$2a$08$bZ.r7l.4X1RhLE1PfnrWZeq/yiSoRexrwZwVi8iP6cJBMluIQo13y', NULL, 3, 0, '2024-04-22 15:55:19', '2024-04-22 15:55:19', NULL),
(77, NULL, '', 'arun@msg-global.com', NULL, '$2a$08$NP9Xuw35.SxY9jK79Eh5.u2SSn8AnFx0tVIdehmIPDkG7.B.xUqWK', NULL, 3, 0, '2024-04-22 17:31:49', '2024-04-22 17:31:49', NULL),
(78, NULL, '', 'aruna@msg-global.com', NULL, '$2a$08$m9VSG6ZKURMwH3eovX7m5e3mvFACEYvcvt9keS3sCGUf2IoYxtO.u', NULL, 3, 0, '2024-04-22 17:32:08', '2024-04-22 17:32:08', NULL),
(79, NULL, '', 'arunaa@msg-global.com', NULL, '$2a$08$Mnkv985MbQLEUBcKrmbcROYFmmxSULTTAVPYoFpL9Fsrp2Pi3rKOK', NULL, 3, 0, '2024-04-22 17:32:34', '2024-04-22 17:32:34', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `photo` (`photo`);

--
-- Indexes for table `frontend_settings`
--
ALTER TABLE `frontend_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `emp_id` (`emp_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `frontend_settings`
--
ALTER TABLE `frontend_settings`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

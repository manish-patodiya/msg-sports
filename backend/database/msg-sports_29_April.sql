-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2024 at 06:52 AM
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
  `about_description` text DEFAULT NULL,
  `houses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `name`, `contact`, `email`, `address`, `website`, `twitter`, `facebook`, `instagram`, `banners`, `about_title`, `about_description`, `houses`) VALUES
(1, 'msg-sports', '+91 9999999999', 'msg-sports@msg-global.com', 'msg global solutions, ag Thurgauerstrasse 39, 8050 Zürich/Oerlikon, Switzerland', '', '', '', '', '[{\"image\":\"banner_image-1714240376572-90003065.jpg\",\"show\":true},{\"image\":\"banner_image-1714240381901-362411692.jpeg\",\"show\":true},{\"image\":\"banner_image-1714240386968-591960652.jpeg\",\"show\":true}]', 'msg sports', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore laboriosam ut laborum cum architecto itaque dolores delectus obcaecati expedita quos temporibus aliquid atque mollitia unde labore, ullam autem! Rerum cupiditate pariatur saepe, tempora, quod totam dolorem eum voluptates enim, facere hic delectus perspiciatis inventore nostrum exercitationem consequatur maxime consectetur corrupti.', '[{\"image\":\"house_image-1714299446551-550679770.jpeg\",\"name\":\"Red House\",\"background\":\"#c62828\",\"description\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident\"},{\"image\":\"house_image-1714299750797-993440087.jpeg\",\"name\":\"Purple House\",\"background\":\"#6a1b9a\",\"description\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident\"},{\"image\":\"house_image-1714299820684-222549592.jpeg\",\"name\":\"Green House\",\"background\":\"#2e7d32\",\"description\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident\"},{\"image\":\"house_image-1714299872889-982034474.jpeg\",\"name\":\"Yellow House\",\"background\":\"#f9a825\",\"description\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident\"},{\"image\":\"house_image-1714299957973-835486661.webp\",\"name\":\"Pink House\",\"background\":\"#ad1457\",\"description\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident\"},{\"image\":\"house_image-1714300000035-771710982.jpeg\",\"name\":\"Orange House\",\"background\":\"#ef6c00\",\"description\":\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem nihil dolor cum animi voluptates cumque, culpa impedit commodi neque vel sed debitis accusantium rerum velit corporis provident\"}]');

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
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0:pending\r\n1:Approved\r\n2:Rejected',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `emp_id`, `name`, `email`, `phone`, `password`, `profile`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, NULL, '', 'patodiya@msg-global.com', NULL, '$2a$08$l2R1K6/UKrlkqFyMq/E03ewfgt8iaI/iV.2zJjM1uvL8gHGpetjJW', NULL, 1, '2024-04-25 11:32:40', '2024-04-25 11:32:40', NULL);

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
(1, 3, 3),
(2, 4, 1),
(3, 4, 2),
(4, 4, 3);

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
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `emp_id` (`emp_id`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

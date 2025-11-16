DROP TABLE IF EXISTS anime_content,anime_series,anime_images,permissions_role,users_role,permissions,roles,users;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 18, 2025 at 05:11 AM
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
-- Database: `ANIMES`
--

-- --------------------------------------------------------

--
-- Table structure for table `anime_content`
--

CREATE TABLE `anime_content` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `id_serie` int NOT NULL,
  `title` varchar(255) NOT NULL UNIQUE,
  `type` enum('season','film','ova') NOT NULL,
  `watch_order` int(11) DEFAULT NULL,
  `chapters` int(11) DEFAULT NULL,
  `watch_status` enum('planned','watching','completed','on_hold','dropped') NOT NULL,
  `review` text DEFAULT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anime_content`
--

INSERT INTO `anime_content` 
(`id_serie`, `title`, `type`, `watch_order`, `chapters`, `watch_status`, `duration`) 
VALUES
(1, 'Bocchi the rock', 'season', 1, 12, 'completed', 240),
(1, 'Bocchi the rock film recap part 1', 'film', 2, NULL,'planned', 165),
(1, 'Bocchi the rock film recap part 2', 'film', 3, NULL,'planned', 165),
(2, 'Honzuki no Gekokujou season 1', 'season', 1, 14, 'completed', 280),
(2, 'Honzuki no Gekokujou season 2', 'season', 2, 12, 'completed', 240),
(2, 'Honzuki no Gekokujou season 3', 'season', 3, 10, 'completed', 200),
(2, 'Honzuki no Gekokujou side stories', 'ova', 2, 1, 'completed', 20);

-- --------------------------------------------------------
--
-- Table structure for table `anime_images`
--

CREATE TABLE `anime_images` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `url` varchar (255) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL UNIQUE,
  `public_id` VARCHAR (255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Dumping data for table `anime_series`
--

INSERT INTO `anime_images` (`id`, `url`, `name`, `public_id`) VALUES
(0, "", "N/A", 'N/A');


-- --------------------------------------------------------
--
-- Table structure for table `anime_series`
--

CREATE TABLE `anime_series` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL UNIQUE,
  `seasons` int(11) DEFAULT NULL,
  `chapters` int(11) DEFAULT NULL,
  `author` varchar(255) NOT NULL,
  `watch_status` enum('planned','watching','completed','on_hold','dropped') NOT NULL,
  `description` text DEFAULT NULL,
  `review` text DEFAULT NULL,
  `idImage` INT DEFAULT NULL CHECK (idImage > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Tables structures for login
--

CREATE TABLE users (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(30) NOT NULL UNIQUE,
  `pwd` VARCHAR (255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE roles (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE users_role (
  `id_user` INT AUTO_INCREMENT NOT NULL,
  `id_role` INT NOT NULL,
  PRIMARY KEY (`id_user`,`id_role`),
  FOREIGN KEY (`id_user`) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`id_role`) REFERENCES roles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE permissions (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE table permissions_role (
  `id_permission` INT NOT NULL,
  `id_role` INT NOT NULL,
  PRIMARY KEY (`id_permission`,`id_role`),
  FOREIGN KEY (`id_permission`) REFERENCES permissions(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`id_role`) REFERENCES roles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Creating triggers for login
-- 

DELIMITER $$

CREATE TRIGGER `user_basic_permission` 
AFTER INSERT 
ON `users`
FOR EACH ROW 
BEGIN
  INSERT INTO `users_role` (`id_user`,`id_role`) VALUES (NEW.id,2);
END$$

CREATE TRIGGER `new_permission_for_admin` 
AFTER INSERT 
ON `permissions`
FOR EACH ROW 
BEGIN 
  INSERT INTO `permissions_role` (`id_permission`,`id_role`) VALUES (NEW.id,1);
END$$

DELIMITER ;

INSERT INTO `roles` (`id`,`name`) VALUES (1,'ADMIN'),(2,'BASIC');
INSERT INTO `permissions` (`name`) VALUES ('image:add'),('image:delete'),('image:update'),('anime:add'),('anime:delete'),('anime:update'),('anime:import');

--
-- Dumping data for table `anime_series`
--

INSERT INTO `anime_series` (`title`, `seasons`, `chapters`, `author`, `watch_status`) VALUES
('Bocchi the rock', 1, 12, 'Aki Hamazi', 'planned'),
('Honzuki no Gekokujō: Shisho ni Naru Tame niwa Shudan o Erandeiraremasen', 3, 36, 'Miya Kazuki', 'completed');

--
-- Indexes for table `anime_content`
--
ALTER TABLE `anime_content`
  ADD KEY `series_table` (`id_serie`);

ALTER TABLE `anime_content`
ADD CONSTRAINT `serie` FOREIGN KEY (`id_serie`) REFERENCES `anime_series` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Indexes for table `anime_series`
--

ALTER TABLE `anime_series`
ADD CONSTRAINT `image` FOREIGN KEY (`idImage`) REFERENCES `anime_images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
commit;
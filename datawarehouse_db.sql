-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 02, 2021 at 05:03 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datawarehouse_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `channels`
--

CREATE TABLE `channels` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `channels`
--

INSERT INTO `channels` (`id`, `name`) VALUES
(1, 'Whatsapp'),
(2, 'Facebook'),
(3, 'Instagram'),
(4, 'E-mail'),
(5, 'Télefono'),
(6, 'Linkedin');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `countries_id` int(11) NOT NULL,
  `isactive` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `countries_id`, `isactive`) VALUES
(1, 'Buenos Aires', 1, b'1'),
(2, 'Córdoba', 1, b'1'),
(3, 'Rio de Janeiro', 2, b'1'),
(4, 'Sao Paulo', 2, b'1'),
(5, 'Lima', 3, b'1'),
(6, 'Bogotá', 4, b'1'),
(7, 'Medellín', 4, b'1'),
(8, 'New York', 5, b'1'),
(9, 'Los Angeles', 5, b'1'),
(10, 'Toronto', 6, b'1'),
(11, 'CDMX', 7, b'1'),
(12, 'Guadalajara', 7, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `cities_id` int(11) NOT NULL,
  `isactive` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `address`, `email`, `phone`, `cities_id`, `isactive`) VALUES
(2, 'Compañía 1', 'Calle 112 # 34 - 56', 'c1@gmail.com', '12345678', 1, b'1'),
(3, 'Compañía 2', 'Calle 113 # 34 - 56', 'c2@gmail.com', '22345678', 2, b'1'),
(4, 'Compañía 3', 'Calle 114 # 34 - 56', 'c3@gmail.com', '32345678', 3, b'1'),
(5, 'Compañía 4', 'Calle 115 # 34 - 56', 'c4@gmail.com', '42345678', 4, b'1'),
(6, 'Compañía 5', 'Calle 116 # 34 - 56', 'c5@gmail.com', '52345678', 5, b'1'),
(7, 'Compañía 6', 'Calle 117 # 34 - 56', 'c6@gmail.com', '62345678', 6, b'1'),
(8, 'Compañía 7', 'Calle 118 # 34 - 56', 'c7@gmail.com', '72345678', 7, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `job_tittle` varchar(45) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(45) DEFAULT NULL,
  `interest` int(3) DEFAULT '0',
  `imgUrl` varchar(255) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `companies_id` int(11) NOT NULL,
  `cities_id` int(11) NOT NULL,
  `isactive` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `username`, `lastname`, `email`, `job_tittle`, `create_time`, `address`, `interest`, `imgUrl`, `users_id`, `companies_id`, `cities_id`, `isactive`) VALUES
(1, 'Nestor', 'Arias', 'na@gmail.com', 'Asistente', '2021-09-21 02:58:04', '123456', 100, NULL, 2, 2, 1, b'1'),
(2, 'Daniel', 'Ramírez', 'dr@gmail.com', 'Gerente', '2021-09-21 02:58:04', NULL, 25, NULL, 3, 3, 2, b'1'),
(3, 'Martha', 'Guerrero', 'mg@gmail.com', 'Estudiante', '2021-09-20 16:16:32', '123456', 25, NULL, 2, 4, 3, b'1'),
(4, 'Sebastian', 'Giraldo', 'sg@gmail.com', 'Mensajero', '2021-09-21 02:58:04', NULL, 75, NULL, 3, 5, 4, b'1'),
(5, 'Joel', 'Goncalves', 'jc@gmail.com', 'Conductor', '2021-09-20 16:16:58', NULL, 75, NULL, 3, 6, 5, b'1'),
(6, 'María', 'Dominguez', 'md@gmail.com', 'Abogada', '2021-09-21 02:58:04', NULL, 25, NULL, 1, 7, 6, b'1'),
(7, 'Ana', 'Pulido', 'ap@gmail.com', 'Coach', '2021-09-21 02:58:04', NULL, 50, NULL, 1, 8, 7, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `contacts_channels`
--

CREATE TABLE `contacts_channels` (
  `id` int(11) NOT NULL,
  `acount` varchar(45) NOT NULL,
  `channels_id` int(11) NOT NULL,
  `preferences_id` int(11) NOT NULL,
  `contacts_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts_channels`
--

INSERT INTO `contacts_channels` (`id`, `acount`, `channels_id`, `preferences_id`, `contacts_id`) VALUES
(24, 'nestorarias', 3, 2, 1),
(25, '123456', 5, 2, 3),
(26, 'mg@gmail.com', 4, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `regions_id` int(11) NOT NULL,
  `isactive` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `regions_id`, `isactive`) VALUES
(1, 'Argentina', 1, b'1'),
(2, 'Brasil', 1, b'1'),
(3, 'Perú', 1, b'1'),
(4, 'Colombia', 1, b'1'),
(5, 'EE.UU', 2, b'1'),
(6, 'Canadá', 2, b'1'),
(7, 'Mexico', 2, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`id`, `name`) VALUES
(1, 'N/A'),
(2, 'Favorito'),
(3, 'No molestar');

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `isactive` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`, `isactive`) VALUES
(1, 'Latinoamérica', b'1'),
(2, 'Norteamérica', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isadmin` bit(1) DEFAULT b'0',
  `isactive` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `lastname`, `email`, `password`, `create_time`, `isadmin`, `isactive`) VALUES
(1, 'user', 'user', 'user@gmail.com', 'user', '2021-08-29 07:27:00', b'0', b'1'),
(2, 'admin', 'admin', 'admin@gmail.com', 'admin', '2021-08-29 07:27:00', b'1', b'1'),
(3, 'Diego', 'Pulido', 'dpulido@gmail.com', 'admin', '2021-08-29 07:27:00', b'1', b'1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `channels`
--
ALTER TABLE `channels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cities_countries_idx` (`countries_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_companies_cities1_idx` (`cities_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contacts_users1_idx` (`users_id`),
  ADD KEY `fk_contacts_companies1_idx` (`companies_id`),
  ADD KEY `fk_contacts_cities1_idx` (`cities_id`);

--
-- Indexes for table `contacts_channels`
--
ALTER TABLE `contacts_channels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contacts_channels_channels1_idx` (`channels_id`),
  ADD KEY `fk_contacts_channels_preferences1_idx` (`preferences_id`),
  ADD KEY `fk_contacts_channels_contacts1_idx` (`contacts_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_countries_regions1_idx` (`regions_id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `channels`
--
ALTER TABLE `channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `contacts_channels`
--
ALTER TABLE `contacts_channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `preferences`
--
ALTER TABLE `preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_cities_countries` FOREIGN KEY (`countries_id`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `fk_companies_cities1` FOREIGN KEY (`cities_id`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `fk_contacts_cities1` FOREIGN KEY (`cities_id`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contacts_companies1` FOREIGN KEY (`companies_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contacts_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `contacts_channels`
--
ALTER TABLE `contacts_channels`
  ADD CONSTRAINT `fk_contacts_channels_channels1` FOREIGN KEY (`channels_id`) REFERENCES `channels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contacts_channels_contacts1` FOREIGN KEY (`contacts_id`) REFERENCES `contacts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contacts_channels_preferences1` FOREIGN KEY (`preferences_id`) REFERENCES `preferences` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `countries`
--
ALTER TABLE `countries`
  ADD CONSTRAINT `fk_countries_regions1` FOREIGN KEY (`regions_id`) REFERENCES `regions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

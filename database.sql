-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 28, 2021 at 12:24 AM
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
-- Database: `mydb`
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
(4, 'Email'),
(5, 'Telefono'),
(6, 'Linkedin'),
(7, 'Twitter');

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
(2, 'Cordoba', 1, b'1'),
(3, 'Rio de Janeiro', 2, b'1'),
(4, 'Sao Paulo', 2, b'1'),
(5, 'Santiago', 3, b'1'),
(6, 'Bogotá', 4, b'1'),
(7, 'Medellín', 4, b'1'),
(8, 'San Francisco', 5, b'1'),
(9, 'Los Angeles', 5, b'1'),
(10, 'Toronto', 6, b'1'),
(11, 'Montreal', 6, b'1'),
(12, 'Mexico City', 7, b'1'),
(13, 'Guadalajara', 7, b'1');

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
(1, 'inversiones albaida s.a.', 'CALLE 60 A SUR CARRERA 105', 'inver@mail.com', '800016314', 1, b'1'),
(2, 'corporacion de inversiones y construcciones ltda.', 'CALLE 36 N.17-56 LOCAL 3-2', 'corpo@mail.com', '890204041', 2, b'1'),
(3, 'master electrico del valle ltda.', 'CARRERA 6 # 18 - 18', 'maste@mail.com', '890315291', 3, b'1'),
(4, 'begole s.a.', 'CALLE 22 127 51 IN 4 BG 2 PS 2', 'begol@mail.com', '800211020', 4, b'1'),
(5, 'sinco ltda s.c.a.', 'CRA 5 NO. 30-51', 'sinco@mail.com', '800043098', 5, b'1'),
(6, 'alvaro velez y cia ltda.', 'CALLE 90 #13-63', 'alvar@mail.com', '860510431', 6, b'1'),
(7, 'dow corning de colombia s.a.', 'TRANSVERSAL 18 NUMERO 78 80', 'dow c@mail.com', '800058886', 7, b'1'),
(8, 'rudesco s.a.', 'CALLE 98 NO. 22 64 PISO 11', 'rudes@mail.com', '860535281', 8, b'1'),
(9, 'digali s.a.', 'CARRERA 8A NO.99-51 OF.405', 'digal@mail.com', '860090230', 9, b'1'),
(10, 'cultivos buenavista ltda sociedad comercializadora internacional', 'CALLE 86 # 11 16', 'culti@mail.com', '860516930', 10, b'1'),
(11, 'flores san juan s.a. c.i.', 'CALLE 87 NO. 20-27 OFICINA 202', 'flore@mail.com', '800154771', 11, b'1'),
(12, 'grupo empresarial de inversiones y cia ltda', 'CL. 94 NO. 21-59', 'grupo@mail.com', '830015816', 12, b'1'),
(13, 'sumazari s.a', 'PIE DEL CERRO CALLE 30 NO. 17-206', 'sumaz@mail.com', '806001219', 13, b'1');

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
(1, 'adriana', 'Cujar', 'acujar@mail.com', 'Profesional', '2021-08-29 02:58:04', NULL, 0, NULL, 3, 1, 1, b'1'),
(2, 'amparo', 'Montoya', 'omontoya@mail.com', 'Dependiente/a', '2021-08-29 02:58:04', NULL, 100, NULL, 1, 2, 2, b'1'),
(3, 'andrea', 'Pilar', 'apilar@mail.com', 'Oficial', '2021-08-29 02:58:04', NULL, 25, NULL, 3, 3, 3, b'1'),
(4, 'erika', 'Vanegas', 'avanegas@mail.com', 'Enfermero/a', '2021-08-29 02:58:04', NULL, 25, NULL, 1, 4, 4, b'1'),
(5, 'fanny', 'Paez', 'ypaez@mail.com', 'Contable', '2021-08-29 02:58:04', NULL, 75, NULL, 3, 5, 5, b'1'),
(6, 'hermes', 'Garcia', 'sgarcia@mail.com', 'Estudiante', '2021-08-29 02:58:04', NULL, 75, NULL, 3, 6, 6, b'1'),
(7, 'luisa', 'Sanchez', 'asanchez@mail.com', 'Dependiente/a', '2021-08-29 02:58:04', NULL, 25, NULL, 1, 7, 7, b'1'),
(8, 'madian', 'Sastoque', 'nsastoque@mail.com', 'Camarero/a', '2021-08-29 02:58:04', NULL, 50, NULL, 1, 8, 8, b'1'),
(9, 'monica', 'Navas', 'anavas@mail.com', 'Estudiante', '2021-08-29 02:58:04', NULL, 75, NULL, 1, 9, 9, b'1'),
(10, 'nestor', 'Patino', 'rpatino@mail.com', 'Arquitecto/a', '2021-08-29 02:58:04', NULL, 0, NULL, 3, 10, 10, b'1'),
(11, 'yulian', 'Ariza', 'nariza@mail.com', 'Recepcionista', '2021-08-29 02:58:04', NULL, 100, NULL, 1, 11, 11, b'1'),
(12, 'adriana', 'Gomez', 'agomez@mail.com', 'Administrativo/a', '2021-08-29 02:58:04', NULL, 100, NULL, 1, 12, 12, b'1'),
(13, 'alcira', 'Carvajal', 'acarvajal@mail.com', 'Contable', '2021-08-29 02:58:04', NULL, 50, NULL, 1, 13, 13, b'1');

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
(1, 'My Whatsapp', 1, 1, 1),
(2, 'My Facebook', 2, 2, 1),
(3, 'My instagram', 3, 3, 1),
(4, 'acujar@mail.com', 4, 2, 1),
(5, 'amontoya', 4, 2, 2),
(6, '312526565', 5, 2, 3);

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
(3, 'Chile', 1, b'1'),
(4, 'Colombia', 1, b'1'),
(5, 'Estados Unidos', 2, b'1'),
(6, 'Canada', 2, b'1'),
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
(1, 'Sin Preferencia'),
(2, 'Canal Favorito'),
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
(1, 'Sudamérica', b'1'),
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
(1, 'usuario', 'usuario', 'usuario@mail.com', 'usuario', '2021-08-29 07:27:00', b'0', b'1'),
(2, 'administrador', 'administrador', 'administrador@mail.com', 'administrador', '2021-08-29 07:27:00', b'1', b'1'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contacts_channels`
--
ALTER TABLE `contacts_channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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

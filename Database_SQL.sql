-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS regions;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS preferences;
DROP TABLE IF EXISTS contacts_channels;




-- -----------------------------------------------------
-- Table `mydb`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`channels` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`regions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`regions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `isactive` BIT(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`countries` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `regions_id` INT(11) NOT NULL,
  `isactive` BIT(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  INDEX `fk_countries_regions1_idx` (`regions_id` ASC) ,
  CONSTRAINT `fk_countries_regions1`
    FOREIGN KEY (`regions_id`)
    REFERENCES `mydb`.`regions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `countries_id` INT(11) NOT NULL,
  `isactive` BIT(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  INDEX `fk_cities_countries_idx` (`countries_id` ASC) ,
  CONSTRAINT `fk_cities_countries`
    FOREIGN KEY (`countries_id`)
    REFERENCES `mydb`.`countries` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`companies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`companies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `cities_id` INT(11) NOT NULL,
  `isactive` BIT(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  INDEX `fk_companies_cities1_idx` (`cities_id` ASC) ,
  CONSTRAINT `fk_companies_cities1`
    FOREIGN KEY (`cities_id`)
    REFERENCES `mydb`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `isadmin` BIT(1) NULL DEFAULT b'0',
  `isactive` BIT(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contacts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `job_tittle` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `interest` INT(3) NULL DEFAULT 0,
  `imgUrl` VARCHAR(255) NULL DEFAULT NULL,
  `users_id` INT(11) NOT NULL,
  `companies_id` INT(11) NOT NULL,
  `cities_id` INT(11) NOT NULL,
  `isactive` BIT(1) NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  INDEX `fk_contacts_users1_idx` (`users_id` ASC) ,
  INDEX `fk_contacts_companies1_idx` (`companies_id` ASC) ,
  INDEX `fk_contacts_cities1_idx` (`cities_id` ASC) ,
  CONSTRAINT `fk_contacts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacts_companies1`
    FOREIGN KEY (`companies_id`)
    REFERENCES `mydb`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacts_cities1`
    FOREIGN KEY (`cities_id`)
    REFERENCES `mydb`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`preferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`preferences` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`contacts_channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`contacts_channels` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `acount` VARCHAR(45) NOT NULL,
  `channels_id` INT(11) NOT NULL,
  `preferences_id` INT(11) NOT NULL,
  `contacts_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contacts_channels_channels1_idx` (`channels_id` ASC) ,
  INDEX `fk_contacts_channels_preferences1_idx` (`preferences_id` ASC) ,
  INDEX `fk_contacts_channels_contacts1_idx` (`contacts_id` ASC) ,
  CONSTRAINT `fk_contacts_channels_channels1`
    FOREIGN KEY (`channels_id`)
    REFERENCES `mydb`.`channels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacts_channels_preferences1`
    FOREIGN KEY (`preferences_id`)
    REFERENCES `mydb`.`preferences` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacts_channels_contacts1`
    FOREIGN KEY (`contacts_id`)
    REFERENCES `mydb`.`contacts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`channels`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (1, 'Whatsapp');
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (2, 'Facebook');
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (3, 'Instagram');
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (4, 'Email');
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (5, 'Telefono');
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (6, 'Linkedin');
INSERT INTO `mydb`.`channels` (`id`, `name`) VALUES (7, 'Twitter');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`preferences`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`preferences` (`id`, `name`) VALUES (1, 'Sin Preferencia');
INSERT INTO `mydb`.`preferences` (`id`, `name`) VALUES (2, 'Canal Favorito');
INSERT INTO `mydb`.`preferences` (`id`, `name`) VALUES (3, 'No molestar');

COMMIT;

--
-- Volcado de datos para la tabla `regions`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`regions` (`id`, `name`) VALUES
(1, 'Sudamérica'),
(2, 'Norteamérica');

COMMIT;

--
-- Volcado de datos para la tabla `countries`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`countries` (`id`, `name`, `regions_id`) VALUES
(1, 'Argentina', 1),
(2, 'Brasil', 1),
(3, 'Chile', 1),
(4, 'Colombia', 1),
(5, 'Estados Unidos', 2),
(6, 'Canada', 2),
(7, 'Mexico', 2);

COMMIT;

--
-- Volcado de datos para la tabla `cities`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`cities` (`id`, `name`, `countries_id`) VALUES
(1, 'Buenos Aires', 1),
(2, 'Cordoba', 1),
(3, 'Rio de Janeiro', 2),
(4, 'Sao Paulo', 2),
(5, 'Santiago', 3),
(6, 'Bogotá', 4),
(7, 'Medellín', 4),
(8, 'San Francisco', 5),
(9, 'Los Angeles', 5),
(10, 'Toronto', 6),
(11, 'Montreal', 6),
(12, 'Mexico City', 7),
(13, 'Guadalajara', 7);

COMMIT;

--
-- Volcado de datos para la tabla `companies`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`companies` (`id`, `name`, `address`, `email`, `phone`, `cities_id`) VALUES
(1, 'inversiones albaida s.a.', 'CALLE 60 A SUR CARRERA 105', 'inver@mail.com', '800016314', 1),
(2, 'corporacion de inversiones y construcciones ltda.', 'CALLE 36 N.17-56 LOCAL 3-2', 'corpo@mail.com', '890204041', 2),
(3, 'master electrico del valle ltda.', 'CARRERA 6 # 18 - 18', 'maste@mail.com', '890315291', 3),
(4, 'begole s.a.', 'CALLE 22 127 51 IN 4 BG 2 PS 2', 'begol@mail.com', '800211020', 4),
(5, 'sinco ltda s.c.a.', 'CRA 5 NO. 30-51', 'sinco@mail.com', '800043098', 5),
(6, 'alvaro velez y cia ltda.', 'CALLE 90 #13-63', 'alvar@mail.com', '860510431', 6),
(7, 'dow corning de colombia s.a.', 'TRANSVERSAL 18 NUMERO 78 80', 'dow c@mail.com', '800058886', 7),
(8, 'rudesco s.a.', 'CALLE 98 NO. 22 64 PISO 11', 'rudes@mail.com', '860535281', 8),
(9, 'digali s.a.', 'CARRERA 8A NO.99-51 OF.405', 'digal@mail.com', '860090230', 9),
(10, 'cultivos buenavista ltda sociedad comercializadora internacional', 'CALLE 86 # 11 16', 'culti@mail.com', '860516930', 10),
(11, 'flores san juan s.a. c.i.', 'CALLE 87 NO. 20-27 OFICINA 202', 'flore@mail.com', '800154771', 11),
(12, 'grupo empresarial de inversiones y cia ltda', 'CL. 94 NO. 21-59', 'grupo@mail.com', '830015816', 12),
(13, 'sumazari s.a', 'PIE DEL CERRO CALLE 30 NO. 17-206', 'sumaz@mail.com', '806001219', 13);

COMMIT;

--
-- Volcado de datos para la tabla `users`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`users` (`id`, `username`, `lastname`, `email`, `password`, `create_time`, `isadmin`, `isactive`) VALUES
(1, 'usuario', 'usuario', 'usuario@mail.com', 'usuario', '2021-08-29 02:27:00', b'0', b'1'),
(2, 'administrador', 'administrador', 'administrador@mail.com', 'administrador', '2021-08-29 02:27:00', b'1', b'1'),
(3, 'rsarmiento', 'rsarmiento', 'rsarmiento@mail.com', 'admin', '2021-08-29 02:27:00', b'1', b'1');

COMMIT;


--
-- Volcado de datos para la tabla `contacts`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`contacts` (`id`, `username`, `lastname`, `email`, `job_tittle`, `create_time`, `address`, `interest`, `imgUrl`, `users_id`, `companies_id`, `cities_id`) VALUES
(1, 'adriana', 'Cujar', 'acujar@mail.com', 'Profesional', '2021-08-28 21:58:04', NULL, 0, NULL, 3, 1, 1),
(2, 'amparo', 'Montoya', 'omontoya@mail.com', 'Dependiente/a', '2021-08-28 21:58:04', NULL, 100, NULL, 1, 2, 2),
(3, 'andrea', 'Pilar', 'apilar@mail.com', 'Oficial', '2021-08-28 21:58:04', NULL, 25, NULL, 3, 3, 3),
(4, 'erika', 'Vanegas', 'avanegas@mail.com', 'Enfermero/a', '2021-08-28 21:58:04', NULL, 25, NULL, 1, 4, 4),
(5, 'fanny', 'Paez', 'ypaez@mail.com', 'Contable', '2021-08-28 21:58:04', NULL, 75, NULL, 3, 5, 5),
(6, 'hermes', 'Garcia', 'sgarcia@mail.com', 'Estudiante', '2021-08-28 21:58:04', NULL, 75, NULL, 3, 6, 6),
(7, 'luisa', 'Sanchez', 'asanchez@mail.com', 'Dependiente/a', '2021-08-28 21:58:04', NULL, 25, NULL, 1, 7, 7),
(8, 'madian', 'Sastoque', 'nsastoque@mail.com', 'Camarero/a', '2021-08-28 21:58:04', NULL, 50, NULL, 1, 8, 8),
(9, 'monica', 'Navas', 'anavas@mail.com', 'Estudiante', '2021-08-28 21:58:04', NULL, 75, NULL, 1, 9, 9),
(10, 'nestor', 'Patino', 'rpatino@mail.com', 'Arquitecto/a', '2021-08-28 21:58:04', NULL, 0, NULL, 3, 10, 10),
(11, 'yulian', 'Ariza', 'nariza@mail.com', 'Recepcionista', '2021-08-28 21:58:04', NULL, 100, NULL, 1, 11, 11),
(12, 'adriana', 'Gomez', 'agomez@mail.com', 'Administrativo/a', '2021-08-28 21:58:04', NULL, 100, NULL, 1, 12, 12),
(13, 'alcira', 'Carvajal', 'acarvajal@mail.com', 'Contable', '2021-08-28 21:58:04', NULL, 50, NULL, 1, 13, 13);

COMMIT;


--
-- Volcado de datos para la tabla `contacts_channels`
--
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`contacts_channels` (`id`, `acount`, `channels_id`, `preferences_id`, `contacts_id`) VALUES
(1, 'My Whatsapp', 1, 1, 1),
(2, 'My Facebook', 2, 2, 1),
(3, 'My instagram', 3, 3, 1),
(4, 'acujar@mail.com', 4, 2, 1),
(5, 'amontoya', 4, 2, 2),
(6, '312526565', 5, 2, 3);

COMMIT;


START TRANSACTION;
USE `mydb`;

ALTER TABLE regions AUTO_INCREMENT = 3;
ALTER TABLE countries AUTO_INCREMENT = 8;
ALTER TABLE cities AUTO_INCREMENT = 14;
ALTER TABLE users AUTO_INCREMENT = 4;
ALTER TABLE companies AUTO_INCREMENT = 14; 
ALTER TABLE contacts AUTO_INCREMENT = 14; 
ALTER TABLE contacts_channels AUTO_INCREMENT = 7; 
COMMIT;



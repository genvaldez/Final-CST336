-- Adminer 4.7.4 MySQL

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) COLLATE utf8_unicode_ci NOT NULL UNIQUE,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `user` (`userId`, `username`, `password`) VALUES
;
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `scheduleId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `userId` mediumint(9) NOT NULL,
  PRIMARY KEY (`scheduleId`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `schedule` (`userId`) VALUES
(1),
(2),
(4),
(3);

DROP TABLE IF EXISTS `action`;
CREATE TABLE `action` (
  `scheduleId` mediumint(9) NOT NULL,
  `description` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `startTime` TIME (0) NOT NULL,
  `endTime` TIME (0) NOT NULL,
  KEY `appointmentId` (`appointmentId`),
  KEY `scheduleId` (`scheduleId`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `appointment` (`appointmentId`, `scheduleId`, `description`, `date`, `startTime`, `endTime`) VALUES
(1,	1, 'appointment1', '2019-12-15', '09:10:00', '11:10:00'),
(2,	1, 'appointment2', '2019-12-30', '13:10:00', '14:10:00'),
(3,	1, 'appointment3', '2019-12-28', '22:10:00', '23:10:00'),
(4,	1, 'appointment4', '2019-12-07', '21:10:00', '23:10:00'),
(5,	1, 'appointment5', '2019-12-18', '11:33:00', '13:45:00'),
(6,	2, 'appointment1', '2019-12-06', '08:00:00', '10:15:00'),
(7,	2, 'appointment2', '2019-12-24', '16:50:00', '16:30:00'),
(8,	2, 'appointment3', '2019-12-08', '14:00:00', '16:00:00'),
(9,	2, 'appointment4', '2019-12-11', '09:00:00', '13:00:00'),
(10, 2, 'appointment5', '2019-12-12', '07:15:00', '08:45:00'),

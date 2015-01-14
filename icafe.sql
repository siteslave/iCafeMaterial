# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 10.0.15-MariaDB)
# Database: icafe
# Generation Time: 2015-01-14 08:59:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table activity
# ------------------------------------------------------------

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `computer_id` int(3) NOT NULL DEFAULT '0',
  `service_date` date DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `service_type` char(1) DEFAULT NULL,
  `player_name` varchar(50) DEFAULT NULL,
  `created_datetime` datetime DEFAULT NULL,
  `money` int(6) DEFAULT NULL,
  `is_pay` char(1) DEFAULT 'N',
  PRIMARY KEY (`computer_id`),
  KEY `idx_computer_id` (`computer_id`),
  KEY `idx_start_date` (`start_time`),
  KEY `idx_service_type` (`service_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;

INSERT INTO `activity` (`computer_id`, `service_date`, `start_time`, `end_time`, `service_type`, `player_name`, `created_datetime`, `money`, `is_pay`)
VALUES
	(5,'2015-01-14','2015-01-14 15:44:23','2015-01-14 18:44:23','Y','ต้นน้ำ','2015-01-14 15:44:23',45,'Y'),
	(3,'2015-01-14','2015-01-14 15:44:37','2015-01-14 16:24:37','Y','GUEST','2015-01-14 15:44:37',10,'Y');

/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table activity_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `activity_log`;

CREATE TABLE `activity_log` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `computer_id` int(3) NOT NULL DEFAULT '0',
  `service_date` date DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `service_type` char(1) DEFAULT NULL,
  `player_name` varchar(50) DEFAULT NULL,
  `created_datetime` datetime DEFAULT NULL,
  `money` int(6) DEFAULT NULL,
  `is_pay` char(1) DEFAULT 'N',
  `true_money` int(12) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_computer_id` (`computer_id`),
  KEY `idx_start_date` (`start_time`),
  KEY `idx_service_type` (`service_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;

INSERT INTO `activity_log` (`id`, `computer_id`, `service_date`, `start_time`, `end_time`, `service_type`, `player_name`, `created_datetime`, `money`, `is_pay`, `true_money`)
VALUES
	(1,5,'2015-01-13','2015-01-13 19:47:35','2015-01-14 10:12:05','Y','TEST','2015-01-13 19:47:35',10,'Y',10),
	(2,4,'2015-01-13','2015-01-13 20:06:09','2015-01-14 10:13:03','Y','XXX','2015-01-13 20:06:09',15,'N',15),
	(3,2,'2015-01-13','2015-01-13 16:05:11','2015-01-14 10:13:30','Y','ต้นน้ำ','2015-01-13 16:05:11',45,'Y',45),
	(4,1,'2015-01-13','2015-01-13 18:40:42','2015-01-14 10:14:35','Y','ต้นน้ำ','2015-01-13 18:40:42',45,'Y',233),
	(5,7,'2015-01-13','2015-01-13 21:14:19','2015-01-14 10:15:00','Y','sdjflkdsjlfsd','2015-01-13 21:14:19',1,'Y',195),
	(6,5,'2015-01-14','2015-01-14 10:15:33','2015-01-14 13:21:27','Y','เต้ย','2015-01-14 10:15:33',30,'Y',46),
	(7,4,'2015-01-14','2015-01-14 13:32:25','2015-01-14 14:33:57','N','นัฐ','2015-01-14 13:32:25',0,'N',15),
	(8,2,'2015-01-14','2015-01-14 13:31:15','2015-01-14 14:36:14','Y','GUEST','2015-01-14 13:31:15',10,'Y',16),
	(9,1,'2015-01-14','2015-01-14 10:18:37','2015-01-14 14:36:18','Y','ต้นนำ้','2015-01-14 10:18:37',20,'Y',64);

/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table computers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `computers`;

CREATE TABLE `computers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `is_active` char(1) DEFAULT 'Y',
  PRIMARY KEY (`id`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `computers` WRITE;
/*!40000 ALTER TABLE `computers` DISABLE KEYS */;

INSERT INTO `computers` (`id`, `name`, `is_active`)
VALUES
	(1,'PC002','Y'),
	(2,'PC001','N'),
	(3,'PC003','N'),
	(4,'PC004','Y'),
	(5,'PC005','N'),
	(6,'PC006','Y'),
	(7,'PC007','Y'),
	(8,'PC008','Y'),
	(9,'PC009','Y'),
	(10,'PC010','N');

/*!40000 ALTER TABLE `computers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pay_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `pay_group`;

CREATE TABLE `pay_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL DEFAULT '',
  `price_hour` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`,`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `pay_group` WRITE;
/*!40000 ALTER TABLE `pay_group` DISABLE KEYS */;

INSERT INTO `pay_group` (`id`, `name`, `price_hour`)
VALUES
	(1,'15 บาท',15),
	(2,'10 บาท',10);

/*!40000 ALTER TABLE `pay_group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`,`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1,'nurse','827ccb0eea8a706c4c34a16891f84e7b');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

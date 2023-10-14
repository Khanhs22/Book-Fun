CREATE DATABASE  IF NOT EXISTS `book_fun`;
USE `book_fun`;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `review`;
DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_time` datetime DEFAULT NULL,
  `book_id` int DEFAULT NULL,

  PRIMARY KEY (`id`),

  KEY `FK_BOOK_ID_idx` (`book_id`),

  CONSTRAINT `FK_COURSE`
  FOREIGN KEY (`book_id`)
  REFERENCES `book` (`id`)

  ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


SET FOREIGN_KEY_CHECKS = 1;
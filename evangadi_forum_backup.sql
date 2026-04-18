-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: evangadi_forum
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answertable`
--

DROP TABLE IF EXISTS `answertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answertable` (
  `answerid` int(20) NOT NULL AUTO_INCREMENT,
  `userid` int(20) NOT NULL,
  `questionid` varchar(100) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`answerid`),
  KEY `userid` (`userid`),
  KEY `id` (`questionid`),
  CONSTRAINT `answertable_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `usertable` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answertable`
--

LOCK TABLES `answertable` WRITE;
/*!40000 ALTER TABLE `answertable` DISABLE KEYS */;
INSERT INTO `answertable` VALUES (1,7,'f0ae5499-a464-420c-91a3-aa8d705e2e96','it is environment of javaScript work','2025-06-18 18:53:11'),(2,7,'1eac84aa-217f-4062-bd9e-68e1caf0cf5c','it is the most popular programing language that used to interactive our static web ','2025-06-18 18:55:50'),(3,5,'f12dfcae-13af-4ef4-b420-2a9d086eed0a','it is json web token digitaly signed that used to exchange information secuirly in between two parties and used to for authentication ','2025-06-18 19:02:38'),(4,5,'f0ae5499-a464-420c-91a3-aa8d705e2e96','it is exaclty right which on the previous but there is something it helps us to do javascript with our brower with out using any xtra extensions','2025-06-18 19:33:20'),(5,5,'f0ae5499-a464-420c-91a3-aa8d705e2e96','it is exaclty right which on the previous but there is something it helps us to do javascript with our brower with out using any xtra extensions','2025-06-18 19:44:48'),(6,13,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c','it is a newly merged field the process of writing line of instraction to do some work','2025-10-05 13:41:32'),(7,13,'cd2e18d5-05e9-41ea-be29-4aaf8dff9f7c','what is that dud\n','2025-10-05 13:55:37'),(8,13,'e1d495cc-3cdc-4e60-aa2d-43726411f823','hey there','2025-10-05 13:58:03'),(9,13,'cd2e18d5-05e9-41ea-be29-4aaf8dff9f7c','what is that','2025-10-05 13:59:15'),(10,13,'3bb008d5-f64d-46a5-9d7e-108e1f217c4c','delete it\n','2025-10-05 14:08:46'),(11,13,'3bb008d5-f64d-46a5-9d7e-108e1f217c4c','delete it\n','2025-10-05 14:10:46'),(12,11,'f0ae5499-a464-420c-91a3-aa8d705e2e96','Nanich answer is exactly correct','2025-10-05 18:09:42'),(13,11,'f0ae5499-a464-420c-91a3-aa8d705e2e96','i didn\'t know','2025-10-05 18:25:52'),(14,11,'f0ae5499-a464-420c-91a3-aa8d705e2e96','is used to test and used javaScript out of it\'s console or engine','2025-10-05 18:38:02'),(15,11,'f0ae5499-a464-420c-91a3-aa8d705e2e96','it is a javaScript  environment','2025-10-05 18:44:35'),(16,11,'f0ae5499-a464-420c-91a3-aa8d705e2e96','hello','2025-10-05 18:52:23'),(17,13,'f12dfcae-13af-4ef4-b420-2a9d086eed0a','used to share information or data secuirly','2025-10-05 19:10:17'),(18,13,'f12dfcae-13af-4ef4-b420-2a9d086eed0a','i don\'t know','2025-10-05 19:11:17'),(19,13,'f12dfcae-13af-4ef4-b420-2a9d086eed0a','this is the first time i hear that','2025-10-05 19:12:51'),(20,14,'f0ae5499-a464-420c-91a3-aa8d705e2e96','hello there','2026-02-19 18:22:42'),(21,14,'f0ae5499-a464-420c-91a3-aa8d705e2e96','i didn\'t know what is that mean','2026-02-19 18:40:57'),(22,15,'f0ae5499-a464-420c-91a3-aa8d705e2e96','hellooooooo','2026-02-19 19:14:48'),(23,17,'f0ae5499-a464-420c-91a3-aa8d705e2e96','to test','2026-02-19 19:25:16'),(24,17,'1a9405f3-38c3-4cbf-b9ff-330e8396e555','hello','2026-02-19 19:26:29'),(25,18,'f0ae5499-a464-420c-91a3-aa8d705e2e96','hello','2026-04-17 18:36:55'),(26,21,'f12dfcae-13af-4ef4-b420-2a9d086eed0a','to test it navegate','2026-04-17 19:19:01'),(27,21,'f12dfcae-13af-4ef4-b420-2a9d086eed0a','Another test','2026-04-17 19:21:21'),(28,11,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c','At its core, programming is problem-solving.','2026-04-18 07:25:44'),(29,11,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c','At its core, programming is problem-solving process.','2026-04-18 07:29:22'),(30,11,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c','Programming is the art and science of giving instructions to computers to perform specific tasks. It\'s the process of designing, writing, testing, and maintaining code that tells a computer what to do. Think of programming as creating a recipe for a computer to follow - every step must be precise, logical, and in the correct order.','2026-04-18 07:35:04'),(31,21,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c','Programming is the art and science of giving instructions to computers to perform specific tasks. It\'s the process of designing, writing, testing, and maintaining code that tells a computer what to do. Think of programming as creating a recipe for a computer to follow - every step must be precise, logical, and in the correct order. Programming requires problem-solving skills, attention to detail, and logical thinking. It\'s used to create websites, mobile apps, games, operating systems, and much more. Learning to program opens up countless career opportunities and gives you the power to build anything you can imagine.','2026-04-18 08:36:53'),(32,21,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c','Programming is the systematic process of creating executable instructions that direct computer behavior. It encompasses algorithm design, code implementation, testing, debugging, and ongoing maintenance. Similar to following a precise technical specification, each logical step must be accurate and properly sequenced. Effective programming demands strong analytical abilities, meticulous attention to detail, and structured reasoning. This discipline enables the development of web applications, mobile software, gaming systems, operating platforms, and countless digital solutions. Mastering programming unlocks diverse professional pathways and empowers you to transform conceptual ideas into functional technology.','2026-04-18 08:38:33');
/*!40000 ALTER TABLE `answertable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questiontable`
--

DROP TABLE IF EXISTS `questiontable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questiontable` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `questionid` varchar(100) NOT NULL,
  `userid` int(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `tag` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`questionid`),
  UNIQUE KEY `questionid` (`questionid`),
  KEY `userid` (`userid`),
  CONSTRAINT `questiontable_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `usertable` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questiontable`
--

LOCK TABLES `questiontable` WRITE;
/*!40000 ALTER TABLE `questiontable` DISABLE KEYS */;
INSERT INTO `questiontable` VALUES (1,'f0ae5499-a464-420c-91a3-aa8d705e2e96',7,'What is Node.js?','Can someone explain what Node.js is and its benefits?',NULL,'2025-06-18 10:52:10'),(2,'f12dfcae-13af-4ef4-b420-2a9d086eed0a',7,'What is JWT?','Can someone explain what JWT is and its benefits?',NULL,'2025-06-18 10:52:10'),(3,'1eac84aa-217f-4062-bd9e-68e1caf0cf5c',5,'What is javaScript?','how to use JS ?',NULL,'2025-06-18 10:52:10'),(4,'afd562af-75b0-45f0-b375-c8fe7bab0583',5,'What is javaScript?','how to use JS ?',NULL,'2025-06-18 10:52:10'),(5,'cd9d9eb8-30b6-4790-80a9-8022257d7f75',5,'What is javaScript?','how to use JS ?',NULL,'2025-06-18 10:52:10'),(6,'871a1346-c521-44ef-aee6-d13ef60a93f6',5,'What is Bootstrap','how to use bootstrap ?',NULL,'2025-06-18 10:53:56'),(7,'7c01073a-41c4-414d-8f56-b08ab5f4c8f5',11,'What is up','am here todey for the first time ?',NULL,'2025-09-30 18:23:54'),(8,'b1aa5c0c-4803-44fc-af21-307ca50e4c6c',13,'What is programing?','most of the time i hear people said that programming programming. what is that mean and what is the difference between coding',NULL,'2025-10-02 17:08:31'),(9,'40022e2b-173f-484f-9375-1403b97d1157',11,'what is up','hey there',NULL,'2025-10-04 07:32:24'),(10,'cd2e18d5-05e9-41ea-be29-4aaf8dff9f7c',11,'erty','xojgpfl',NULL,'2025-10-04 09:12:12'),(11,'3bb008d5-f64d-46a5-9d7e-108e1f217c4c',11,'werfdvmcx','sdfdfldvc',NULL,'2025-10-04 10:19:20'),(12,'08c9b521-7dc6-4fcc-adf1-8f75b8c49401',11,'werfdvmcx','sdfdfldvc',NULL,'2025-10-04 10:19:57'),(13,'bf17c7c0-d0e9-4bcb-8439-908f79cb2cfc',11,'werfdvmcx','sdfdfldvc',NULL,'2025-10-04 10:20:37'),(14,'f5a1519b-fa3c-4f03-8a79-fa73b872c3c8',11,'werfdvmcx','sdfdfldvc',NULL,'2025-10-04 10:29:29'),(15,'3dfc0cfc-bc73-4e4c-a5ad-4267c4fb3e91',11,'werfdvmcx','sdfdfldvc',NULL,'2025-10-04 10:29:54'),(16,'676e040d-743e-4d44-b952-1f2e3ea0e46d',11,'werfdvmcx','sdfdfldvc',NULL,'2025-10-04 10:30:09'),(17,'5ab0f58a-574a-4b34-801b-778a74999209',11,'werfdvmcx ','sdfgbcvxx',NULL,'2025-10-04 11:01:17'),(18,'a761b81b-1d31-444c-97d7-3db032495f52',11,'wejef','sdefjkfglcmvn',NULL,'2025-10-04 11:11:31'),(19,'e1d495cc-3cdc-4e60-aa2d-43726411f823',11,'hello','world',NULL,'2025-10-04 11:14:05'),(20,'db9f437a-4816-40d1-b562-879781a3bd58',15,'what is full stack development','i want to know about MERN full-Stack',NULL,'2026-02-19 19:15:51'),(21,'1a9405f3-38c3-4cbf-b9ff-330e8396e555',17,'hello','what is that mean hello',NULL,'2026-02-19 19:25:57'),(22,'f41e7120-f28e-47b1-8bde-f934732b90a9',18,'test one','what is test one',NULL,'2026-04-17 18:38:39');
/*!40000 ALTER TABLE `questiontable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertable` (
  `userid` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (1,'jossi','Yosef','Azeneg','jossi@gmail.com','123456'),(2,'jossi','Yosef','Azeneg','jossi@gmail.com','123456'),(3,'jossi','Yosef','Azeneg','jossi@gmail.com','123456'),(4,'haylisha','Yosef','Azeneg','haylisha@gmail.com','12345678'),(5,'nanich','Yosef','Azeneg','nanich@gmail.com','$2b$10$/C74GDJkhQgCbwF0ZInfJ.DraiAu5aY1u3PEPs6nKNOvQrie4Gdem'),(6,'gebrie','Yosef','Azeneg','gebrie@gmail.com','$2b$10$JvH2xoaJClNcJciwwJ2ScOCycJJM8tm1QHYrzNIScicuWkRRyeW3S'),(7,'ha','Haile','Aze','haili@gmail.com','$2b$10$f/vVtAOoK3osB33118iG3eQjLFi2H/N0nwFEVeYPeZoJMv8O2YNmy'),(8,'jossina','Jossi','Az','jossi@email.com','$2b$10$zLfm.MC5H6PTCe7zPV6dNu4j.9rKfVM3Np0IMm5B0Aa66iDfKjTem'),(9,'yosi','Yo','Yo','yo@gmail.com','$2b$10$SEdMEkznwsDL9YHMrrUiuu05L0h0AFwu4hLzGNjqUm.zvlkzx7NO2'),(10,'Yos','Jossi','Az','Josseph@email.com','$2b$10$Q8kRgjSqAcdqev3Y4LdOpeL5RigKpDXKvXYKr.6qkXgAqoHO8FWuO'),(11,'Jos','Yosef','Az','Jose@gmail.com','$2b$10$1XIdHecHi6YvhMloqcD.retqPPqYSRW/zEP12sR/R9tlqW1QX/qCi'),(12,'Gebriya','Gebre','Az','gebrieya@gmail.com','$2b$10$BwWUDj8nN4oEyPlxTxsiReb1IiTeifYxJ4UPG/UsOMDrQImJC3B2.'),(13,'joss','Yosef','Aze','jossi21@gmail.com','$2b$10$u1U3NBFlFYyNXfc87tmogeyB/aD1uLx5abu9k9n7H7ogjaiJa.FKO'),(14,'test1234','test','1234','test1234@gmail.com','$2b$10$6GCRejsbM1Vzw7fMORu3M.Mo8RpqPqbuTH2x8YTdQUZyk8Np1zEsy'),(15,'test123','test','123','test123@gmail.com','$2b$10$dk2yUDWRPyzR/6TIFWop3.LWyZ2Iu1bv7nzVI1IO1TZvl2JKLIO6q'),(16,'test12','test','123','test12@gmail.com','$2b$10$LWzbqe.uR9qU3FGeyHQCOeDE9Cvy7Yi2tA9UjQNcKIFPUXLRt0pCa'),(17,'test11','test','11','test11@gmail.com','$2b$10$RZj6tNG4t87pdT1hoedkHOzNLNllZcbDmSbTK3RvTE6F0bepftTv.'),(18,'Joosss','Admin','Admin','admin@gmail.com','$2b$10$tzPI1mlkp7eC/QZUD/oDJeJo3I1j1lNx8jUPtq8VveWmQeLDpmzYe'),(19,'hay','Haile','Aze','hailie@gmail.com','$2b$10$xeGjj7EYzkvfNAqCQqoYQeZRxdTPOJ9FfD7aqhHj4fn.dZe7rQ7le'),(20,'hai','Haile','Aze','hai@gmail.com','$2b$10$Rix18DVIrf.Q540sUuG.M.FYTZ59koDuJI3BHhUvHmVpcEbkhz7cy'),(21,'Admin1','Admin','1','admin1@gmail.com','$2b$10$0gXfbef9Fs1Vz1zJ6YQLueXmfdym4n5iV9SmlR/6/m0iX8pusQ.iK'),(22,'Jossy','Joo','Az','jossy@gmail.com','$2b$10$2uBUWqnE4n7gAIDCIbWQyOuEvnuSKjPM988TG/tKIThXqRO0WyZcy');
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-18 12:20:45

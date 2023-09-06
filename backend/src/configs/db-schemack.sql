-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema logr-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema logr-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `logr-db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `logr-db` ;

-- -----------------------------------------------------
-- Table `logr-db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logr-db`.`users` (
  `email` VARCHAR(100) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logr-db`.`logbooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logr-db`.`logbooks` (
  `intern_name` VARCHAR(45) NOT NULL,
  `matricule` VARCHAR(45) NOT NULL,
  `department` VARCHAR(45) NOT NULL,
  `level` VARCHAR(45) NOT NULL,
  `start_date` VARCHAR(45) NOT NULL,
  `weeks` VARCHAR(45) NOT NULL,
  `company_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `user_id` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `company_email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `title`),
  INDEX `logbook_id_idx` (`title` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `logr-db`.`users` (`email`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `logr-db`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logr-db`.`logs` (
  `date` VARCHAR(45) NOT NULL,
  `week` INT NOT NULL,
  `activity` VARCHAR(500) NULL DEFAULT NULL,
  `logbook_id` VARCHAR(45) NOT NULL,
  `user_logbook_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`date`, `logbook_id`, `user_logbook_id`),
  INDEX `user_logbook_id_idx` (`user_logbook_id` ASC) VISIBLE,
  CONSTRAINT `logbook_id`
    FOREIGN KEY (`user_logbook_id`)
    REFERENCES `logr-db`.`logbooks` (`user_id`),
  CONSTRAINT `user_logbook_id`
    FOREIGN KEY (`user_logbook_id`)
    REFERENCES `logr-db`.`logbooks` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

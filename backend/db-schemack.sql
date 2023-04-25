-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema log-r
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema log-r
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `log-r` DEFAULT CHARACTER SET cp1256 ;
USE `log-r` ;

-- -----------------------------------------------------
-- Table `log-r`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `log-r`.`accounts` (
  `email` CHAR(45) NOT NULL,
  `username` CHAR(45) NOT NULL,
  `password` CHAR(45) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `log-r`.`logbooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `log-r`.`logbooks` (
  `logbook_id` INT NOT NULL,
  `logbooks_name` CHAR(45) NOT NULL,
  `intern_name` CHAR(45) NOT NULL,
  `matricule_number` CHAR(45) NOT NULL,
  `department` CHAR(45) NOT NULL,
  `level` CHAR(45) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `company_name` CHAR(45) NOT NULL,
  `company_address` CHAR(45) NOT NULL,
  `company_tel` INT(10) NOT NULL,
  `company_email` CHAR(45) NOT NULL,
  `accounts_email` CHAR(45) NOT NULL,
  PRIMARY KEY (`logbook_id`),
  INDEX `fk_logbooks_accounts_idx` (`accounts_email` ASC) VISIBLE,
  CONSTRAINT `fk_logbooks_accounts`
    FOREIGN KEY (`accounts_email`)
    REFERENCES `log-r`.`accounts` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `log-r`.`logs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `log-r`.`logs` (
  `log_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `activity` CHAR(45) NOT NULL,
  `logbooks_logbook_id` INT NOT NULL,
  PRIMARY KEY (`log_id`),
  INDEX `fk_log_logbooks1_idx` (`logbooks_logbook_id` ASC) VISIBLE,
  CONSTRAINT `fk_log_logbooks1`
    FOREIGN KEY (`logbooks_logbook_id`)
    REFERENCES `log-r`.`logbooks` (`logbook_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

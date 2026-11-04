-- *************************************************************
-- This script creates the table needed for the Node server Demo
-- *************************************************************

-- create the database
DROP DATABASE IF EXISTS library;
CREATE DATABASE library;

-- select the database
USE library;

-- create the tables
CREATE TABLE books
(
  bookId			INT	            PRIMARY KEY		AUTO_INCREMENT,
  bookTitle        	VARCHAR(50)  	NOT NULL,
  author		   	VARCHAR(50)		NOT NULL,
  publisher	   		VARCHAR(50)    	NOT NULL,
  yearPublished		VARCHAR(50)     NOT NULL,
  isbn				VARCHAR(50)     NOT NULL
);

-- *************************************************************
-- Now add some data
-- *************************************************************

INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (1,'To Kill a Mockingbird','Harper Lee','J. B. Lippincott & Co.','1960','978-0060935467');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (2,'Dune','Frank Herbert','Chilton Book Company','1965','978-0441172719');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (3,'The Hobbit','J. R. R. Tolkien','George Allen & Unwin','1937','978-0007487288');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (4,'Neuromancer','William Gibson','Ace Books','1984','978-0441569595');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (5,'Thinking, Fast and Slow','Daniel Kahneman','Farrar, Straus and Giroux','2011','978-0374275631');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (6,'Sapiens: A Brief History of Humankind','Yuval Noah Harari','Harper','2015','978-0062316097');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (7,'The Da Vinci Code','Dan Brown','Doubleday','2003','978-0385504201');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (8,'Beloved','Toni Morrison','Alfred A. Knopf','1987','978-1400033416');
INSERT INTO `books` (`bookId`,`bookTitle`,`author`,`publisher`,`yearPublished`,`isbn`) VALUES (9,'Good Omens','Neil Gaiman & Terry Pratchett','Victor Gollancz Ltd','1990','978-0060853983');

DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE electronics (
  id INT NOT NULL AUTO_INCREMENT,
  qty INT NULL,
  description VARCHAR(100) NULL,
  cost DECIMAL(10,4) NULL,

  PRIMARY KEY (id)
);

CREATE TABLE bioAnimals (
  id INT NOT NULL AUTO_INCREMENT,
  qty INT NULL,
  description VARCHAR(100) NULL,
  cost DECIMAL(10,4) NULL,

  PRIMARY KEY (id)
);

SELECT * FROM electronics;
SELECT * FROM bioAnimals;

DROP DATABASE IF EXISTS atlantis_StockDB;
CREATE database atlantis_StockDB;

USE atlantis_StockDB;

CREATE TABLE atl_Stock (
  id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  retail DECIMAL(10,4) NULL,
  cost DECIMAL(10,4) NULL,
  qoh DECIMAL(10,4) NULL,
  PRIMARY KEY (id)
);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('Xbox One X','Electronics',299.95,176.89,16);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('Red Dead Redemption 2','Electronics',59.99,31.95,6);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('2019 Genesis G70','Automotive',34675.00,28765.00,2);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('245/65R18 Nexen Tires','Automotive',135.00,125.00,8);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('"The Odyssey" by: Homer','Books',19.98,12.65,5);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('Percy Jackson Series','Books',59.99,42.95,11);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('Xbox One Elite Controller','Electronics',159.98,132.99,9);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('26300-35504 Hyundai Oil Filter','Automotive',14.95,6.76,12);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('Google Hub','Electronics',149.99,120.00,20);

INSERT INTO atl_Stock (product_name, department_name, retail, cost, qoh)
VALUES ('Custom Wood Desk','Furniture',599.98,478.87,3);




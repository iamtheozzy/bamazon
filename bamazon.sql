DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ("YEEZY BLUSH 500", 'Shoes', 250.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("YEEZY BREDS 350", 'Shoes', 220.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("NIKE OFF-WHITE AIR 1", 'Shoes', 300.00, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("NIKE OFF-WHITE AIR 1", 'Shoes', 300.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("FEAR OF GOD YELLOW BOMBER", 'Jackets', 150.00, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("NORTHFACE GORTEX RED JACKET", 'Jackets', 250.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("YELLOW SUN DRESS", 'Dresses', 250.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("RAY BAN AVIATORS", 'Sunglasses', 170.00, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("RAY BAN ORIGINALS", 'Sunglasses', 200.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("APPLE WATCH", 'Technology', 300.00, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("iPhone X 64GB SILVER", 'Technology', 1000.00, 5);



SELECT * FROM products;
SELECT item_id, product_name, price  FROM products;

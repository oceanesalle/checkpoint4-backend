CREATE DATABASE 'checkpoint4'; 
USE 'checkpoint4'; 
CREATE TABLE client ( 
  id INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(80) NOT NULL,
  clientcode VARCHAR(80) NOT NULL,
  email VARCHAR(80) NOT NULL,
  PRIMARY KEY (id)
); 

INSERT INTO 'client' ('id', 'name', 'clientcode', 'email')
VALUES 
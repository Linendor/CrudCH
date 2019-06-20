CREATE DATABASE registro;

USE registro;

--  USER

CREATE TABLE users (
  id INT(11) NOT NULL,
  nombreusu VARCHAR(16) NOT NULL,
  pass VARCHAR(60) NOT NULL,
  nombrecom VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;



SELECT * FROM users;

-- PERSONAL 
CREATE TABLE personal (
  id INT(11) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellidoP VARCHAR(100) NOT NULL,
  apellidoM VARCHAR(100) not NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  plantel VARCHAR(100) NOT NULL,
  perfil VARCHAR(100) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE personal
  ADD PRIMARY KEY (id);

ALTER TABLE personal
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE personal;
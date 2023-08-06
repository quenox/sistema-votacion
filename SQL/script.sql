-- Este script permite crear las tablas y cargarla de datos
-- Obs:
-- Se registran todas las regiones pero solo 2 comunas por cada región (32 total), ya que, es a modo demostración.
-- Se permite a los votantes solamente realizar 1 voto, independiente de la fecha o el año en el que haya votado.






-- ------------------------------------------
-- Tabla: region
-- Descripción: Esta tabla almacena todas las regiones de chile.
-- ------------------------------------------
CREATE TABLE region (
  codigo VARCHAR(3) PRIMARY KEY,
  nombre VARCHAR(80)
);

-- Poblar la tabla region
INSERT INTO region (codigo, nombre) VALUES
('AYP', 'Región de Arica y Parinacota'),
('TAR', 'Región de Tarapacá'),
('ANT', 'Región de Antofagasta'),
('ATA', 'Región de Atacama'),
('COQ', 'Región de Coquimbo'),
('VAL', 'Región de Valparaíso'),
('RMA', 'Región Metropolitana de Santiago'),
('OHI', 'Región del Libertador General Bernardo O''Higgins'),
('MAU', 'Región de Maule'),
('NUB', 'Región de Ñuble'),
('BBO', 'Región de Biobío'),
('ARA', 'Región de La Araucanía'),
('LRS', 'Región de Los Ríos'),
('LLS', 'Región de Los Lagos'),
('AIN', 'Región de Aysén del General Carlos Ibáñez del Campo'),
('MAG', 'Región de Magallanes y de la Antártica Chilena');






-- ------------------------------------------
-- Tabla: comuna
-- Descripción: Esta tabla almacenará información sobre las comunas en diferentes regiones. Contiene una referencia a la tabla region.
-- ------------------------------------------
CREATE TABLE comuna (
  codigo_postal INT UNSIGNED PRIMARY KEY,
  nombre VARCHAR(100),
  ref_region VARCHAR(3),
  FOREIGN KEY (ref_region) REFERENCES region(codigo)
);

-- Se agregarán solo 2 comunas por cada región, ya que, es una demostración de la solución
-- Comunas para Región de Arica y Parinacota
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1000000, 'Arica', 'AYP'),
(1000001, 'Parinacota', 'AYP');

-- Comunas para Región de Tarapacá
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1100000, 'Iquique', 'TAR'),
(1100001, 'Tamarugal', 'TAR');

-- Comunas para Región de Antofagasta
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1200000, 'Antofagasta', 'ANT'),
(1200001, 'El Loa', 'ANT');

-- Comunas para Región de Atacama
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1300000, 'Copiapó', 'ATA'),
(1300001, 'Chañaral', 'ATA');

-- Comunas para Región de Coquimbo
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1400000, 'La Serena', 'COQ'),
(1400001, 'Elqui', 'COQ');

-- Comunas para Región de Valparaíso
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1500000, 'Valparaíso', 'VAL'),
(1500001, 'Isla de Pascua', 'VAL');

-- Comunas para Región Metropolitana de Santiago
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1600000, 'Santiago', 'RMA'),
(1600001, 'Cordillera', 'RMA');

-- Comunas para Región del Libertador General Bernardo O'Higgins
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1700000, 'Rancagua', 'OHI'),
(1700001, 'Cachapoal', 'OHI');

-- Comunas para Región de Maule
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1800000, 'Talca', 'MAU'),
(1800001, 'Curicó', 'MAU');

-- Comunas para Región de Ñuble
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(1900000, 'Chillán', 'NUB'),
(1900001, 'Diguillín', 'NUB');

-- Comunas para Región de Biobío
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(2000000, 'Concepción', 'BBO'),
(2000001, 'Ñuble', 'BBO');

-- Comunas para Región de La Araucanía
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(2100000, 'Temuco', 'ARA'),
(2100001, 'Cautín', 'ARA');

-- Comunas para Región de Los Ríos
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(2200000, 'Valdivia', 'LRS'),
(2200001, 'Ranco', 'LRS');

-- Comunas para Región de Los Lagos
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(2300000, 'Puerto Montt', 'LLS'),
(2300001, 'Llanquihue', 'LLS');

-- Comunas para Región de Aysén del General Carlos Ibáñez del Campo
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(2400000, 'Coyhaique', 'AIN'),
(2400001, 'Aysén', 'AIN');

-- Comunas para Región de Magallanes y de la Antártica Chilena
INSERT INTO comuna (codigo_postal, nombre, ref_region) VALUES
(3000000, 'Punta Arenas', 'MAG'),
(3000001, 'Magallanes', 'MAG');






-- ------------------------------------------
-- Tabla: candidato
-- Descripción: Esta tabla almacenará información sobre los candidatos.
-- ------------------------------------------
CREATE TABLE candidato (
  rut INT UNSIGNED PRIMARY KEY,
  nombres VARCHAR(40),
  apellidop VARCHAR(20),
  apellidom VARCHAR(20)
);

-- Poblar la tabla candidato
INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (12345678, 'Juan', 'Perez', 'Gomez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (87654321, 'Maria', 'Lopez', 'Rodriguez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (56789012, 'Pedro', 'Garcia', 'Fernandez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (34567890, 'Ana', 'Martinez', 'Diaz');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (90123456, 'Carlos', 'Gonzalez', 'Sanchez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (78901234, 'Laura', 'Hernandez', 'Lopez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (45678901, 'Luis', 'Ramirez', 'Perez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (23456789, 'Elena', 'Flores', 'Martinez');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (67890123, 'Diego', 'Acosta', 'Castro');

INSERT INTO candidato (rut, nombres, apellidop, apellidom)
VALUES (89012345, 'Valeria', 'Ortiz', 'Gomez');






-- ------------------------------------------
-- Tabla: votante
-- Descripción: Esta tabla almacenará información sobre los votantes.
-- ------------------------------------------
CREATE TABLE votante (
  rut INT UNSIGNED PRIMARY KEY,
  nombre_apellido VARCHAR(40) NOT NULL,
  alias VARCHAR(20),
  email VARCHAR(20),
  ref_comuna INT UNSIGNED,
  FOREIGN KEY (ref_comuna) REFERENCES comuna(codigo_postal)
);






-- ------------------------------------------
-- Tabla: voto
-- Descripción: Esta tabla almacenará información sobre los votos.
-- IMPORTANTE: Se asume que un votante podrá realizar únicamente un voto, ya que, no queda claro en el enunciado.
-- (en caso de poder votar 1 vez por año se podría crear una crear una primary key combinada entre año y ref_votante,
--   pero como se dijo anteriormente se asume que solo podrá votar una única vez)
-- ------------------------------------------
CREATE TABLE voto (
  fecha_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ref_candidato INT UNSIGNED,
  ref_votante INT UNSIGNED PRIMARY KEY,
  FOREIGN KEY (ref_candidato) REFERENCES candidato(rut),
  FOREIGN KEY (ref_votante) REFERENCES votante(rut)
);






-- ------------------------------------------
-- Tabla: fuente_informativa
-- Descripción: Esta tabla almacenará información sobre ¿cómo se enteró de nosotros? de los votantes,
-- los valores permitidos son definidos en un ENUM.
-- ------------------------------------------
CREATE TABLE fuente_informativa (
  ref_votante INT UNSIGNED,
  tipo ENUM('Web', 'TV', 'Redes Sociales', 'Amigo') NOT NULL,
  FOREIGN KEY (ref_votante) REFERENCES votante(rut),
  UNIQUE (ref_votante, tipo) -- Restricción única para evitar duplicados
);

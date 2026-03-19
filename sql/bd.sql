CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE titulos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    tipo ENUM('anime','manga') NOT NULL,
    genero VARCHAR(100) NOT NULL,
    estado ENUM('en_emision','finalizado','pendiente') NOT NULL,
    total_episodios INT NOT NULL,
    sinopsis TEXT
);

CREATE TABLE progreso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo_id INT NOT NULL,
    episodio_actual INT NOT NULL,
    estado_personal ENUM('viendo','completado','en_pausa','abandonado') NOT NULL,
    ultima_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(usuario_id, titulo_id),

    FOREIGN KEY (usuario_id) 
    REFERENCES usuarios(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY (titulo_id) 
    REFERENCES titulos(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Insertar datos para pruebas
-- Usuario
INSERT INTO usuarios (nombre, correo, contraseña)
VALUES ('Braulio', 'braulio@email.com', '12345');

-- Titulo
INSERT INTO titulos (titulo, tipo, genero, estado, total_episodios, sinopsis)
VALUES (
'Naruto',
'anime',
'accion',
'finalizado',
220,
'Historia de un ninja que busca convertirse en Hokage'
);

-- Progreso
INSERT INTO progreso (usuario_id, titulo_id, episodio_actual, estado_personal)
VALUES (1,1,10,'viendo');
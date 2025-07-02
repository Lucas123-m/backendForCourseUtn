# Descripcion general: 

API para hacer operaciones basicas (CRUD) con series de animes (titulo, capitulos, autor, estado de visualización, gestionar imagenes, etc.).

# Librerias.
 Se deben instalar con npm express, mysql2, cors y dotenv. Se deja un archivo .env.example para configurar los datos de conexion con la bbdd. 

# BBDD:

El archivo **init.sql** crea las tablas e inserta un par de registros.
Se crean 3 tablas en mysql, anime_series, anime_images y anime_content.

- anime_series: se registra el titulo que se toma como "principal" del anime.

- anime_content: se registran todos los posibles elementos / contenidos de la historia para ver y el orden correspondiente, siempre asociados a una serie en anime_series.

- anime_images: se registra el id de la imagen referenciado en anime_series y la url de la imagen subida en cloudinary. Tambien un nombre con el cual aparecerá listada para agregar a un anime registrado.

En las 3 tablas existe una columna "id" como primary key con auto_increment. 

En la tabla anime_content creo una foreign key para id_serie con el id de anime_series para asegurar que los contenidos siempre esten relacionados a una serie (registro en anime_series).

En la tabla anime_series creo una foreign key para idImage con el id de anime_images.

Algunos campos en las tablas anime_series y anime_content les puse default null porque no son obligatorios o se pueden agregar en un momento distinto a cuando se crea un nuevo registro.

--- 

## Tecnologías Usadas
MySQL: Sistema de gestión de bases de datos relacional.
Javascript con nodejs y express: lenguaje de programacion javascript del lado del servidor usando nodejs y express como framework.

# API:

## Creo 6 endpoints para obtener informacion (metodo GET):


- obtener todas las series => /animes/series

- obtener todos los contenidos de todas las series => /animes/series/contents

- obtener una serie en base al id => /animes/series/:id

- obtener un contenido en base al id => /animes/series/contents/:id

- Obtener todas las imagenes => /animes/images

- Obtener una imagen en base al ID => /animes/images/:id


## Creo 3 endpoints para agregar informacion (metodo POST):


- agregar una serie => /animes/series/

- agregar un contenido => /animes/series/contents/:id

- agregar una imagen => /animes/imagens/


## Creo 3 endpoints para actualizar informacion (metodo PUT):


- actualizar una serie en base al id => /animes/series/

- actualizar un contenido en base al id => /animes/series/contents/:id

- actualizar una imagen en base al id => /animes/images/

## Creo 3 endpoints para eliminar informacion (metodo DELETE):


- borrar una serie en base al id => /animes/series/

- borrar un contenido en base al id => /animes/series/contents/:id

- borrar una imagen en base al id => /animes/images/:id

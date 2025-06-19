Descripcion general: API para hacer operaciones basicas (CRUD) con series de animes (titulo, capitulos, autor, estado de visualización, etc.).

BBDD:
El archivo init.sql crea las tablas e inserta un par de registros.
Se crean 2 tablas en mysql, anime_series y anime_content. 
anime_series: se registra el titulo que se toma como "principal" del anime.
anime_content: se registran todos los posibles elementos / contenidos de la historia para ver y el orden correspondiente, siempre asociados a una serie en anime_series.

En ambas tablas existe una columna "id" como primary key con auto_increment. En la tabla anime_content creo una foreign key para id_serie con el id de anime_series para asegurar que los contenidos siempre esten relacionados a una serie (registro en anime_series).
Algunos campos en ambas tablas les puse default null porque no son obligatorios o se pueden agregar en un momento distinto a cuando se crea un nuevo registro.

API - Endpoints:
Creo 4 endpoints para obtener informacion (metodo GET):
obtener todas las series => /animes/series
obtener todos los contenidos de todas las series => /animes/series/contents
obtener una serie en base al id => /animes/series/:id
obtener un contenido en base al id => /animes/series/contents/:id

Creo 2 endpoints para agregar informacion (metodo POST):
agregar una serie => /animes/series/
agregar un contenido => /animes/series/contents/:id

Creo 2 endpoints para actualizar informacion (metodo PUT):
actualizar una serie en base al id => /animes/series/
actualizar un contenido en base al id => /animes/series/contents/:id

Creo 2 endpoints para elimnar informacion (metodo DELETE):
borrar una serie en base al id => /animes/series/
borrar un contenido en base al id => /animes/series/contents/:id
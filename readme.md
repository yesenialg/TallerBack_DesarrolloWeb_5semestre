ACTIVIDAD 2 - DESARROLLO WEB // ABRIL 28 DEL 2021

OBJETIVO: Analizar y compreder la estructura de un API.

OBJETIVOS ESPECIFICOS:
Identificar los diferentes endpoints que se pueden tener en un proyecto.
Diferenciar los http methods 
Construir adecuadamente una petición http request con sus componentes.

SCRIPT BASE DE DATOS
create database universidad;
create table personas ( id serial not null primary key, name varchar not null,  email varchar not null);

REQUISITOS DE LA ENTREGA:
Crear la base de datos universidad y la tabla de personas.
[endpoint #1] Hacer un endpoint que me permita crear una persona en la base de datos.
Enviar un correo de bienvenida a la persona después de que se guarde en base de datos. (La plantilla y la información del correo es diseño libre)
[endpoint #2] Descargar un reporte en csv o excel con la información de la tabla de personas.
Entregar la colección de postman con cada uno de los enpoints solicitados.
Entregar el link del repositorio.

Líbrerias: A continuación se compartes unas librerías opcionales, pueden crear su propia librería o utilizar otras.
https://nodemailer.com/
https://www.npmjs.com/package/exceljs
# DataWareHouse
**Proyecto Final Data Warehouse**

Sistema para la administracion de contactos de clientes para una compañia.

# Modo Freelance
El desarrolador crea sus propias vistas para desplegar la informacion, manteniendo la funcionalidad en conjunto.


## Entregables
- Carpeta FrontEnd: 
- Carpeta BackEnd
- Readme.md

## Requisitos

### Instalar NodeJS
  - [Descargar Nodejs](https://nodejs.org/en/download/)

### Instalar XAMPP
  - [Descargar XAMPP](https://www.apachefriends.org/es/download.html)

### Instalar Postman
  - [Descargar Postman](https://www.postman.com/product/api-client/)

# Despliegue

# BackEnd
**1) Preparacion de archivos**

* Clonar el repositorio desde github accediendo al link: https://github.com/120m4n/AcamicaDatawarehouse.git

**2) Descomprimir los archivos y ubicar una terminal en la carpeta Backend**


**3) Instalar dependencias**
```
npm install
```

**4) Migracion de esquema de base de datos**
* Iniciar los modulos MYSQL y Apache desde el panel de XAMPP.
![Alt panel xampp](./Backend/Migracion/Panel_XAMPP.PNG?raw=true "Panel XAMPP")
* Abrir XAMPP e iniciar los servicios de **Apache Web Server** y **MySQL Database**
* Abir el navegador a la(http://localhost/phpmyadmin/)**.
* En la pestaña Importar, boton "Seleccionar archivo" buscar la ruta local al archivo "Creacion_Schema.sql". 
El archivo se encuenta en la ruta: **./Backend/Migracion/Creacion_Schema.sql**
* Ejecutar la importacion con el boton "Continuar"
![Alt importacion data](./Backend/Migracion/Importacion.PNG?raw=true "importacion data")
**Opcional
Ejecutar el archivo "Creacion_Schema.sql" en MySQL Workbench.

* Modelo Entidad-Relacion.
![Alt modelo ER](./Backend/Migracion/ER_Diagram.PNG?raw=true "Modelo ER")

**4) Generar el modelo de prisma**
```
npx prisma generate
```

**5) Iniciar el servidor**
```
node ./src/app.js
```

# FrontEnd

**1) Ubicar una terminal en la carpeta FrontEnd**

**2) Inicializar Visual Studio Code**
```
code .
```

**3) Lanzar el index.html desde un server, puede ser live server**
[Descargar LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
![Alt Live Server](./Backend/Migracion/LiveServer.png?raw=true "Live Server")

## CREDENCIALES PARA PRUEBA
### ADMIN
{
    "username":"administrador",
    "password":"administrador"
}

### USER
{
    "username":"usuario",
    "password":"usuario"
}


## NOTAS:
### Modo Freelance
Se escogio modo freelance para agilizar la creacion de las interfaces
### Libreria Prisma
Prisma es un conjunto de herramientas para bases de datos de código abierto. Permite generar consultas anidadas mas facil que el sql tradicional.
### Responsive
El frontend se realizo para ajustarse solamente a su version de escritorio
### Live server
Los navegadores actuales bloquean el acceso cruzado a (js, css, etc) mediante CORS, para evitar esto se hace necesario inicializar el index.html desde un servidor.



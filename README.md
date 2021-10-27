# Data Warehouse
**Diplomado Desarrollo Web FullStack - Proyecto Final**

*Las carpetas alojadas en este repositorio contienen el proyecto desarrollado en su totalidad.*<br />
*The folders stored into this repository contain the fully developed project.*

<br /><br />

# Back-End
**Set-Up and Installation**

1. Download the source code or clone repository using git: https://github.com/diegopulido2d/Data_Warehouse
2. Open a command line terminal or bash into the 'Back-End' folder.
3. Make sure you've got NodeJS and NPM installed in your system.
4. Run 'npm init' in order to install the base packages.

**Preparing the Database**
1. Make sure you've got MySQL and Apache installed in your system.
2. Run your local SQL environment (MAMP, XAMPP or similar).
3. Locate your localhost port settings.
4. Make sure your localhost port number is the same as the number after the 'PORT' variable in the .env file.
5. Run your localhost, and open your SQL graphic interface (phpMyAdmin, MariaDB, Heidi, or similar).
6. Import the database .sql file, located into the 'db_sql' folder. You can also run the query through your command line to create all the tables of the project.
7. Make sure to set all the environment variables according to your localhost settings (username, password and dtabase name). You can do this in the .env file.


**4) Generar el modelo de prisma**
```
npx prisma generate
```

**5) Iniciar el servidor**
```
node ./src/app.js
```

# Front-End

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



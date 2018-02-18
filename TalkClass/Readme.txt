Readme, Angular 2 |
------------------

Este archivo es para ir documentando el proyecto de Angular 2.

***********
/cuantomeme
***********

* Angular-cli.json tiene un atributo llamado "styles", que es un array de
archivos .css, que contiene los archivos CSS que se van a aplicar globalmente
a toda la aplicaci�n.

* Package.json es b�sicamente el pom.xml de Angular 2. Contiene todas las dependencias.
Estas dependencias se instalan en "node_modules" al ejecutar el comando "npm install".

* La carpeta "e2e" es de testing. No nos sirve para nada.

***********
/src
***********

* La carpeta "app" contiene las clases de la aplicaci�n.

* La carpeta "assets" es parecida a la "static" de Spring Boot.
Sirve para a�adir todo el contenido est�tica que se empaquetar� junto
a la app. Es decir: CSS, im�genes, etc...

* main.ts es la clase principal de la aplicaci�n. Es el application.java de Angular 2.

* Index.html es el HTML principal de la p�gina. No tocar.

* Styles.css es el CSS principal de la p�gina y se aplica globalmente.
Est� vac�o.

***********
/app
***********

* App.component.ts es el componente principal de la aplicaci�n y que contiene
la barra de navegaci�n de la p�gina. 

* App.module.ts es la clase donde se tienen que declarar los componentes para que funcionen.

####################################
Gu�as de estilo
####################################

* Las clases tipo "vi�eta", "usuario", "comentario", "tag" ir�n en la carpeta "classes"
y se anotar�n como "[loquesea].class.ts".

* Los componentes ir�n anotados como "[loquesea].component.ts", y luego su nombre de componente ser�
"[loquesea]Component".

* Los templates y CSS estar�n en la carpeta "templates". Los templates se llamar�n "[loquesea].template.html",
mientras que los archivos CSS son libres de llamarse como se quiera.

* Los servicios igualmente ir�n en la carpeta "services" y se llamar�n "[loquesea].service.ts".
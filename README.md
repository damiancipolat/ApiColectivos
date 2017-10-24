# Api Recorrido de colectivos
[n!solid]http://blogs.lanacion.com.ar/ciencia-maldita/files/2009/09/colectivos1-465x500.png

>El proyecto consiste en un servidor de Api Rest, el cual permite obtener los recorridos de las lineas de colectivos que pasan por dos diferentes coordenas dentro de la Ciudad de Buenos Aires.
> Se uso como fuente de datos el portal https://data.buenosaires.gob.ar/dataset/colectivos
## Código fuente:
Simplemente hay que clonar el repositorio, luego ejecutar:
```sh
$ npm install ya-csv
$ npm install mongodb
$ npm install
```
El Api rest utiliza una Bd en MongoDB la cual debe ser creada para poder usar el servidor con el nombre "pruebas".
La carga de datos se debe realizar usando el sig. script:
```sh
$ node recorridosLoader.js
```
El proyecto se encuentra en un 80%, los servicios que actualmente ofrece el api son:

- #### busById: Devuelve toda la info disponible sobre un idlinea de colectivo
Ej: http://127.0.0.1:5000/busById/7159/

- #### busByLinea: Devuelve toda la info disponible sobre la linea de un colectivo.
Ej: http://127.0.0.1:5000/busByLinea/101/

- #### busNearPoint: Devuelve los recorridos de colectivos cercanos a una latitud y longitud, con un radio en metros.
Ej: http://127.0.0.1:5000/busNearPoint/-58.4764909777277/-34.537637026185585/1

- #### busNearTwoPoints: Devuelve los recorridos de colectivos que pasan en común en base a dos coordenadas.
Ej: http://127.0.0.1:5000/busNearTwoPoints/-58.466854021173695/-34.550604027450575/-58.4764909777277/-34.537637026185585/1

# Pendientes:
Devolver información sobre las paradas de colectivos cercanas a los puntos. 

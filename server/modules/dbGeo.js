//Instancia a mongodb.
const mongoClient = require('mongodb').MongoClient;

//Clase para realizar las consulta a MongoDB.
module.exports = class mongoFinder
{
	constructor()
	{
		this.urlDbPruebas = 'mongodb://localhost:27017/pruebas';
	}

	//Traigo los recorridos de lineas de colectivos en las cercanias de un punto.
	busNearToPoint(lat,lon,radius,callback)
	{
		mongoClient.connect(this.urlDbPruebas, function(err, db)
		{
		    if (err!=null) 
		    {
		        console.log('Sorry unable to connect to MongoDB Error:', err);

		        //Ejecuto el callback pasando el error como param.
		        callback(null,err);
		    }
		    else
		    { 
		    	//Grabo todo el lote de datos.
		        var collection = db.collection('colectivos');
		 
		 		//Hago la busqueda geografica.
		 		collection.find({"puntos.location":{$geoWithin:{$center:[[lat,lon],radius]}}},
		 						{"idlinea":1,"linea":1,"ramal":1,"tipo":1,"sentido":1,"puntos":1}).toArray(function(err, results)
		 		{
    				//Ejecuto la funcion callback, paso como param. el resultado de la busqueda.
    				callback(results,null);

    				//Cerrar, siempre que se termine la conexion.
    				db.close();
				});
		    }
		});
	}

	//Traigo el recorrido en base a un idlinea.
	busByIdlinea(idlinea,callback)
	{
		mongoClient.connect(this.urlDbPruebas, function(err, db)
		{
		    if (err!=null) 
		    {
		        console.log('Sorry unable to connect to MongoDB Error:', err);

		        //Ejecuto el callback pasando el error como param.
		        callback(null,err);
		    }
		    else
		    { 
		    	//Grabo todo el lote de datos.
		        var collection = db.collection('colectivos');
		 
		 		//Hago la busqueda geografica.
		 		collection.find({"idlinea":idlinea},{"idlinea":1,"linea":1,"ramal":1,"tipo":1,"sentido":1,"puntos":1}).toArray(function(err, results)
		 		{
    				//Ejecuto la funcion callback, paso como param. el resultado de la busqueda.
    				callback(results,null);

    				//Cerrar, siempre que se termine la conexion.
    				db.close();
				});
		    }
		});
	}

	//Traigo el recorrido en base a la linea.
	busByLinea(linea,callback)
	{
		mongoClient.connect(this.urlDbPruebas, function(err, db)
		{
		    if (err!=null) 
		    {
		        console.log('Sorry unable to connect to MongoDB Error:', err);

		        //Ejecuto el callback pasando el error como param.
		        callback(null,err);
		    }
		    else
		    { 
		    	//Grabo todo el lote de datos.
		        var collection = db.collection('colectivos');
		 
		 		//Hago la busqueda geografica.
		 		collection.find({"linea":linea},{"idlinea":1,"linea":1,"ramal":1,"tipo":1,"sentido":1,"puntos":1}).toArray(function(err, results)
		 		{
    				//Ejecuto la funcion callback, paso como param. el resultado de la busqueda.
    				callback(results,null);

    				//Cerrar, siempre que se termine la conexion.
    				db.close();
				});
		    }
		});
	}		
}
//Parser de csv.
const csv = require('ya-csv');

//Instancia a mongodb.
const mongoClient = require('mongodb').MongoClient;

//http://doduck.com/node-js-mongodb-hello-world-example/

//Clase para grabar datos en mongo.
class mongoRecorder
{
	constructor()
	{
		this.urlDB 	= 'mongodb://localhost:27017/pruebas';
	}

	//Grabo el lote de datos en mongodb.
	saveInMongo(datos)
	{
		mongoClient.connect(this.urlDB, function(err, db)
		{
		    if (err) 
		        console.log('Sorry unable to connect to MongoDB Error:', err);
		    else
		    { 
		    	//Grabo todo el lote de datos.
		        var collection = db.collection('colectivos');
		 
		        collection.insertMany(datos, { w: 1 }, function(err, records) {
		            console.log("Record added :- " + records);
		        });
		 
		        db.close();
		    }
		});
	}	
}

//Clase que lee un archivo csv y lo vuelca en mongo.
class openDataLoader
{
	constructor()
	{		
		this.path   	= null;
		this.reader 	= null;
		this.datos  	= [];
		this.mongo      = new mongoRecorder();
	}

	//Cargar el archivo.
	cargarArchivo(file)
	{
		console.log('> Cargando datos.');

		//Cargo el archivo en el reader.
		this.path   = file; 
		this.reader = csv.createCsvFileReader(this.path,{'separator':';'});
		
		//Cuando hay datos.
		this.reader.on('data',(rec)=>{this.datos.push(rec);});

		//Cuando terminan de cargarse.
		this.reader.on('end',()=>
		{
			console.log('> Fin de la carga.');

			//Quito las columnas del item 0.
			this.datos = this.datos.slice(1,this.datos.length);

			//Adapto el formato del array.
			this.datos = this.parseArray(this.datos);

			//Guardo en mongodb.
			this.mongo.saveInMongo(this.datos);
		});
	}

	//Grabar datos en mongodb.
	parseArray(datos)
	{
		//Si hay datos.
		if (datos.length>0)
		{
			let resu = [];

			//Parse los datos.
			datos.forEach((item)=>
			{
				//Quito el linestring.
				item[0] = item[0].replace("LINESTRING (", "");

				//Parse el string a un array.
				let tmp = item[0].split(',');

				//Creo un array con puntos.
				let ptos = [];

				//Itero el string parseado.
				tmp.forEach((x)=>{
					//Parseo cada item.
					let pto = x.split(' ');

					//Grabo los puntos.
					ptos.push({"location":[parseFloat(pto[0]),parseFloat(pto[1])]});
				});

				//Agrego los datos a un array para que se agregue con el formato.
				resu.push({"puntos":ptos,"idlinea":item[1],"linea":item[2],"tipo":item[3],"ramal":item[4],"sentido":item[5]});
			});

			return resu;
		}

		return null;
	}
}

//Mensaje de inicio.
console.log('');
console.log('Cargando archivo de recorridos...');
console.log('Por Damián Cipolat');
console.log('');

//Creo instancia al loader.
let loader = new openDataLoader();

//Proceso los datos.
loader.cargarArchivo('./data/recorrido-colectivos.csv');

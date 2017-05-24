//Importo la clase de mongodb.
let bdGeo = require('./dbGeo');

//Importo las funciones auxiliares.
let foo   = require('./foo');

//Funcion que trae recorrido de un colectivo en base a su id.
module.exports.busByIdlinea = (req,res)=>
{
	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//Ejecuto la consulta.
	let db = new bdGeo();

	//Consulto la bd.
	db.busByIdlinea(req.params.idlinea,(datos,error)=>
	{
		//Analizo si hubo error, sino devuelvo todos los datos.
		if (error!=null)
			res.json({'Error':'hubo un error','data':error});
		else
			res.json({"datos":datos});
	});  	
}

//Funcion que trae el recorrido de un colectivo en base a su linea.
module.exports.busByLinea = (req,res)=>
{
	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//Ejecuto la consulta.
	let db = new bdGeo();

	//Consulto la bd.
	db.busByLinea(req.params.linea,(datos,error)=>
	{
		//Analizo si hubo error, sino devuelvo todos los datos.
		if (error!=null)
			res.json({'Error':'hubo un error','data':error});
		else
			res.json({"datos":datos});
	});
}

//Función del servicio de busqueda de colectivos cerca de un punto.
module.exports.busNearToPoint = (req,res)=>
{
	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//Ejecuto la consulta.
	let db = new bdGeo();

	//Consulto la bd.
	db.busNearToPoint(parseFloat(req.params.lat),parseFloat(req.params.lon),parseFloat(req.params.radio),(datos,error)=>
	{
		//Analizo si hubo error, sino devuelvo todos los datos.
		if (error!=null)
			res.json({'Error':'hubo un error','data':error});
		else
			res.json({"datos":datos});
	});
};

//Función del servicio de busqueda de colectivos en común que pasan cerca de dos puntos.
module.exports.busNearTwoPoints = (req,res)=>
{
	//Antes, envio los headers para permitir el cross-origin.
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//Ejecuto la consulta.
	let db = new bdGeo();

	//Hago la consulta a la bd, para obtener los ptos de la 1ra coordenada.
	db.busNearToPoint(parseFloat(req.params.lat1),parseFloat(req.params.lon1),parseFloat(req.params.radio),(datosR1,errorR1)=>
	{
		//Analizo si hubo error, sino devuelvo todos los datos.
		if (errorR1!=null)
			res.json({'Error':'hubo un error','data':error});
		else
		{
			//Hago la consulta a la bd para obtener los ptos de la 2da coordenadas.
			db.busNearToPoint(parseFloat(req.params.lat2),parseFloat(req.params.lon2),parseFloat(req.params.radio),(datosR2,errorR2)=>
			{
				//Analizo si hubo error, sino devuelvo todos los datos.
				if (errorR2!=null)
					res.json({'Error':'hubo un error','data':error});
				else
				{
					//Busco la interesección de los dos lotes de datos.
					let enComun = foo.intersectRutas(datosR1,datosR2);

					//Reviso si hay rutas en común.
					if (enComun.length>0)
						res.json({"datos":enComun});
					else
						res.json({"datos":[],"msj":"No se encontraron recorridos."});
				}
			});
		}			
	});
};
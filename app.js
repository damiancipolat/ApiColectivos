//Incluyo modulos.
const http   	 = require('http');
const express 	 = require('express');

//Instancias.
const app 	 	 = express();
const server 	 = http.createServer(app);
const port 		 = 5000;

//Traigo los servicios del api.
const apiCore    = require('./server/modules/apiCore');

/*
	Ejemplos:

		En base a un idlinea.
		http://127.0.0.1:5000/busById/7159/

		En base a una linea.
		http://127.0.0.1:5000/busByLinea/101/

		En base a un pto.
		http://127.0.0.1:5000/busNearPoint/-58.4764909777277/-34.537637026185585/1

		En base a dos ptos.
		http://127.0.0.1:5000/busNearTwoPoints/-58.466854021173695/-34.550604027450575/-58.4764909777277/-34.537637026185585/1
*/


//Buscar colectivos cercanos a un punto.
app.get('/busNearPoint/:lat/:lon/:radio/',apiCore.busNearToPoint);

//Buscar colectivos que pasen por dos puntos.
app.get('/busNearTwoPoints/:lat1/:lon1/:lat2/:lon2/:radio/',apiCore.busNearTwoPoints);

//Buscar colectivos en base al idlinea.
app.get('/busById/:idlinea/',apiCore.busByIdlinea);

//Buscar colectivos en base a la linea.
app.get('/busByLinea/:linea/',apiCore.busByLinea);

//Agrego esta ruta, para los casos en que se escribe mal la url para obtener siempre un retorno.
app.get('*',(req,res)=>{
	res.json({error:"Servicio inexistente."});
});

//Inicializo el servidor, escuchando conexiones en el puerto fijado en port.
app.listen(port,(err)=>
{
	//Si hay un error, muestro por la consola, sino msj de inicio.
	if (err)
		console.log('ERROR: hubo un problema al inciar el server.');
	else
	{
		console.log('');		
		console.log('Server | Api Colectivos');		
		console.log('>Listen on port: '+port);
		console.log('');
	}
});
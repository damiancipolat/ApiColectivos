//Busco la interseccíón de los dos lotes de resultados con idlinea en común.
module.exports.intersectRutas = (resu1,resu2)=>
{
	//Array con datos en común.
	let enComun = [];

	//Busco lineas en común.
	resu1.forEach((item)=>
	{
		//Filtro, las lineas que tenga la misma linea.
		let comun = resu2.filter((bus)=>
		{
			return bus.idlinea == item.idlinea;
		});

		//Si se encontraron datos en común.
		if (comun.length>0)
			enComun.push(comun);
	});

	return enComun;
}
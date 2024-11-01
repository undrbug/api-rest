
const getCountryState = {
	getCountries: async () => {
		try {
			const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
			const countries = await response.json();

			countries.map((country) => {
				return {
					nombre: country.nombre
				}
			});
			return countries;
		} catch (error) {
			console.log(`Error al traer lista de paises: ${error.message}`);
			return [];
		}
	},
	getStates: async () => {
		try {
			const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
			const statesResp = await response.json();
			let states = [];
			states = statesResp.provincias.map(provincia => {
				return {
					nombre: provincia.nombre
				}
			})
			states.forEach(provincia => {
				console.log(provincia.nombre);
			});
			return states;
		} catch (error) {
			console.log(`Error al traer lista de ciudades: ${error.message}`);
			return [];
		}
	},
	getDepartments: async (state) => {
		try {
			const response = await fetch("https://apis.datos.gob.ar/georef/api/departamentos");
			const departmentsResp = await response.json();
			// const departments = [];
			// departments = departmentsResp.map((department) => {
			// 	if (department.provincia.nombre === state) {
			// 		return {
			// 			nombre: department.nombre
			// 		}
			// 	}
			// });
			console.log(departmentsResp.nombre);
		} catch (error) {
			console.log(`Error al traer lista de departamentos: ${error.message}`);
			return [];
		}
	},
	getProvinciasJson: async () => {
		try {
			const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias.json");
			const provincias = await response.json();
			const prov = provincias.provincias.map(provincia => {
				return {
					nombre: provincia.nombre
				}
			})
			prov.sort((a, b) => {
				if (a.nombre < b.nombre) {
					return -1;
				}
				if (a.nombre > b.nombre) {
					return 1;
				}
				return 0;
			});
			return prov;
		} catch (error) {
			console.log(`Error al traer lista de provincias: ${error.message}`);
			return [];
		}
	},
	getDepartamentosJson: async (provincia) => {
		try {
			const response = await fetch("https://apis.datos.gob.ar/georef/api/departamentos.json");
			const departamentosResp = await response.json();
			const deps = departamentosResp.departamentos.filter(departamento => departamento.provincia.nombre === provincia);
			const departamentos = deps.map(departamento => {
				return {
					nombre: departamento.nombre
				}
			})
			return departamentos;
		} catch (error) {
			console.log(`Error al traer lista de departamentos: ${error.message}`);
			return [];
		}
	}
}

module.exports = getCountryState;


document.addEventListener("DOMContentLoaded", function () {
	const getCountryState = require("../../services/dataCountries.js");
	const selectCity = document.getElementById("city");
	const state = document.getElementById("state");

	state.addEventListener("change", async () => {
		const stateValue = state.value;
		const response = await getCountryState.getDepartamentosJson(stateValue);
		const departments = await response.json();
		console.log(departments);
		selectCity.innerHTML = "";
		departments.forEach((department) => {
			selectCity.innerHTML += `<option value="${department.nombre}">${department.nombre}</option>`;
		});
	});
});

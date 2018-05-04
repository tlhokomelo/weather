"use strict";

/*
*   Tlhokomelo Molokwane
*   2018 - Front End Assesment
*
*/


(function() {
	const url = "http://api.openweathermap.org/data/2.5/weather?q=";
	const uri = "http://openweathermap.org";
	const apiKey = "eacc4615812011e71d89522e2c0e270e";

	let state = {};
	let category = 'all';

	document.querySelector('.forecast-btn').addEventListener('click', function(e) {
		e.preventDefault();
		const location = document.querySelector('#location').value;
		document.querySelector('#location').value = '';
		fetch(url + location + '&appid=' + apiKey).then(function(response) {
			return(response.json());
		}).then(function(response) {
			UIupdate_success(response);
		}).catch(function() {
			UIupdate_failure();
		});
	}, false);

	// Ajax Calls
	function UIupdate_success(response) {
		const degC = response.main.temp - 273.15;
		const degCInt = Math.floor(degC);
		const degF = degC * 1.8 + 32;
		const degFInt = Math.floor(degF);
			state = {
				condition: response.weather[0].main,
				icon: uri + "/img/w/" + response.weather[0].icon + ".png",
				degCInt: Math.floor(degCInt),
				degFInt: Math.floor(degFInt),
				city: response.name
		};

		const into = document.querySelector('.weather_status');
			let forecastTitle = document.querySelector('.location_title');
			let container = document.createElement('div');
			let cityPara = document.createElement('p');
				cityPara.setAttribute('class','city');
				forecastTitle.textContent = (state.city +" Forecast.");
				cityPara.textContent = state.city;

			let weather_statusPara = document.createElement('p');

				weather_statusPara.textContent = `${state.degCInt}\u00B0 C / ${state.degFInt}\u00B0 F`;
			let iconImage = document.createElement('img');
				iconImage.setAttribute('src', state.icon);
				iconImage.setAttribute('alt', state.condition);
				weather_statusPara.appendChild(iconImage);
				container.appendChild(cityPara);
				container.appendChild(weather_statusPara);

		if (document.querySelector('.weather_status div')) {

			into.replaceChild(container, document.querySelector('.weather_status div'));


		} else {
			into.appendChild(container);
		}

	}

	//  Ajax failure
	function UIupdate_failure() {
		document.querySelector(".weather_status").textContent = "Sorry. Weather information is not available.";
	}

var show = function (elem) {
	elem.style.display = 'block';
};

var hide = function (elem) {
	elem.style.display = 'none';
};

var toggle = function (elem) {
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	} else {
		show(elem);
	}


};

document.addEventListener('click', function (event) {

	if (!event.target.classList.contains('toggle')) return;
	event.preventDefault();

	var content = document.querySelector(event.target.hash);
	if (!content) return;

	toggle(content);

}, false);









})();

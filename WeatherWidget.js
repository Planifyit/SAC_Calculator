(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = 
    `<div id="weatherInfo">Loading...</div>`;  
        
    class WeatherWidget extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: "open"});
            this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.loadWeatherData();
        }

        async loadWeatherData() {
            let weatherDiv = this.shadowRoot.querySelector("#weatherInfo");
            // Call the API and update the weatherDiv's innerHTML with the real-time data
            // For example, if using OpenWeatherMap API:
            // const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key');
            // const data = await response.json();
            // weatherDiv.innerHTML = `Current temperature in London: ${data.main.temp}`;
        }
    }
    customElements.define('weather-widget', WeatherWidget);
})();

//model
class FlightModel {
  constructor(url) {
    this.url = url;
    this.data = [];
  }
  async loadData() {
    const response = await fetch(this.url);
    this.data = await response.json();
  }
  getOriginCities(limit = 100) {
    const cities = this.data.map((item) => item.Origin_city);
    return cities.slice(0, limit);
  }
}
//view
class FlightView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }
  showCities(cityList) {
    this.container.innerHTML = "";
    cityList.forEach((city) => {
      const p = document.createElement("p");
      p.textContent = city;
      this.container.appendChild(p);
    });
  }
}
class FlightController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  async init() {
    await this.model.loadData();
    const cities = this.model.getOriginCities();
    this.view.showCities(cities);
  }
}
const model = new FlightModel("Airports2_1000.json");
const view = new FlightView("output");
const controller = new FlightController(model, view);

controller.init;

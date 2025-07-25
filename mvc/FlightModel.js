export class FlightModel {
  static data = [];

  static async loadData() {
    const response = await fetch("Airports2_1000.json");
    this.data = await response.json();
  }

  static getAllData() {
    return this.data;
  }
}

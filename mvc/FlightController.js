import { FlightModel } from "./FlightModel.js";
await FlightModel.loadData();
export function getData() {
  return FlightModel.getAllData().slice(0, 10);
}

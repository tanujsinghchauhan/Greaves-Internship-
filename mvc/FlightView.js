import { getData } from "./FlightController.js";

export class FlightView {
  static async showAllData(containerId) {
    const data = await getData();
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.forEach((flight) => {
      const card = document.createElement("div");
      card.style.display = "flex";
      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.margin = "10px 0";
      card.style.borderRadius = "5px";
      card.style.backgroundColor = "#f9f9f9";
      card.style.justifyContent = "space-evenly";
      card.style.alignItems = "center";

      const originCol = document.createElement("div");
      const destinationCol = document.createElement("div");
      const otherCol = document.createElement("div");

      originCol.style.marginRight = "20px";
      destinationCol.style.marginRight = "20px";

      const originTitle = document.createElement("h4");
      originTitle.textContent = "Origin Info";
      originCol.appendChild(originTitle);

      const destTitle = document.createElement("h4");
      destTitle.textContent = "Destination Info";
      destinationCol.appendChild(destTitle);

      const otherTitle = document.createElement("h4");
      otherTitle.textContent = "Other Info";
      otherCol.appendChild(otherTitle);

      for (const key in flight) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${flight[key]}`;
        const lowerKey = key.toLowerCase();
        if (
          lowerKey.includes("origin") ||
          key === "Org_airport_lat" ||
          key === "Org_airport_long"
        ) {
          originCol.appendChild(p);
        } else if (
          lowerKey.includes("destination") ||
          key === "Dest_airport_lat" ||
          key === "Dest_airport_long"
        ) {
          destinationCol.appendChild(p);
        } else {
          otherCol.appendChild(p);
        }
      }

      card.appendChild(originCol);
      card.appendChild(destinationCol);
      card.appendChild(otherCol);
      container.appendChild(card);
    });
  }
}

FlightView.showAllData("output");

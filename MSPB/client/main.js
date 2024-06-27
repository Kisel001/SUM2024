// import { Pane } from "tweakpane";
import * as mapblibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./main.css";
import {
  mspbdb,
  getLineIdStation,
  getCoordStation,
  getRouteOtherLines,
} from "./mspb.js";
import {
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  line8,
} from "./mspb.js";

let drawroute = null;
let map;

function main() {
  const style = {
    id: "raster",
    version: 8,
    name: "Raster style",
    center: [0, 0],
    zoom: 0,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        minzoom: 0,
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: {
          // 77, 120, 204
          "background-color": "#4d78cc",
          "background-opacity": 0.5,
        },
      },
      {
        id: "simple-tiles",
        type: "raster",
        source: "raster-tiles",
      },
    ],
  };

  map = new maplibregl.Map({
    container: "map",
    // style:
    // "https://api.maptiler.com/maps/backdrop/style.json?key=mpMljMg7hFdFp6ez02pj", // style URL
    style: style,
    // "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
    center: [30.3, 60],
    zoom: 15,
  });

  map.on("load", () => {
    /***
     * SOURCE
     ***/

    // Line1
    map.addSource("line1", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line1,
        },
      },
    });
    // Line2
    map.addSource("line2", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line2,
        },
      },
    });
    // Line3
    map.addSource("line3", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line3,
        },
      },
    });
    // Line 4
    map.addSource("line4", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line4,
        },
      },
    });
    // Line 5
    map.addSource("line5", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line5,
        },
      },
    });
    // Line 6
    map.addSource("line6", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line6,
        },
      },
    });
    // Line 8
    map.addSource("line8", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: line8,
        },
      },
    });

    /***
     * ADDING LAYERS
     ***/

    // LINE 1
    map.addLayer({
      id: "line1",
      type: "line",
      source: "line1",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#FF0000",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });
    // LINE 2
    map.addLayer({
      id: "line2",
      type: "line",
      source: "line2",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#0000FF",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });

    // LINE 3
    map.addLayer({
      id: "line3",
      type: "line",
      source: "line3",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#008000",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });

    // LINE 4
    map.addLayer({
      id: "line4",
      type: "line",
      source: "line4",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#FF8000",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });

    // LINE 5
    map.addLayer({
      id: "line5",
      type: "line",
      source: "line5",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#400080",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });

    // LINE 6
    map.addLayer({
      id: "line6",
      type: "line",
      source: "line6",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#894E35",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });

    // LINE 8
    map.addLayer({
      id: "line8",
      type: "line",
      source: "line8",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#00A0F0",
        "line-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // zoom is 5 (or less) -> circle radius will be 1px
          7,
          0,
          // zoom is 10 (or greater) -> circle radius will be 5px
          8,
          1,
        ],
        "line-width": 8,
      },
    });
  });
}

function getRoute() {
  const st1 = prompt("Enter departure station");

  if (st1 == null) return;

  const st2 = prompt("Enter arrival station");

  if (st2 == null) return;

  if (st1 == st2) {
    alert("This is the same station");
    return;
  }

  let i1 = getLineIdStation(st1);
  let i2 = getLineIdStation(st2);

  if (i1 == null || i2 == null) return;

  let route;

  if (i1[1] == i2[1]) {
    //alert("One line!");

    if (i1[0] > i2[0]) {
      let tmp = i1[0];
      i1[0] = i2[0];
      i2[0] = tmp;
    }

    if (i1[1] == 1) route = line1.slice(i1[0], i2[0] + 1);
    else if (i1[1] == 2) route = line2.slice(i1[0], i2[0] + 1);
    else if (i1[1] == 3) route = line3.slice(i1[0], i2[0] + 1);
    else if (i1[1] == 4) route = line4.slice(i1[0], i2[0] + 1);
    else if (i1[1] == 5) route = line5.slice(i1[0], i2[0] + 1);
    else if (i1[1] == 6) route = line6.slice(i1[0], i2[0] + 1);

    let c1 = getCoordStation(i1[1], i1[0])[0];
    let c2 = getCoordStation(i2[1], i2[0])[0];
  } else {
    if (i1[1] > i2[1]) {
      let tmp = i1;
      i1 = i2;
      i2 = tmp;
    }

    route = getRouteOtherLines(i1[1], i1[0], i2[1], i2[0]);
  }

  if (drawroute === true) {
    map.removeLayer("route");
    map.removeSource("route");
  }

  if (route == null) return;

  alert(`Дорога в пути примерно ${((route.length - 1) * 2.8).toFixed()} минут`);

  // SLINE
  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    },
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#FFFF00",
      "line-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        // zoom is 5 (or less) -> circle radius will be 1px
        7,
        0,
        // zoom is 10 (or greater) -> circle radius will be 5px
        8,
        1,
      ],
      "line-width": 8,
    },
  });

  drawroute = true;
}

window.addEventListener("load", () => {
  for (let i of line1) i.reverse();

  for (let i of line2) i.reverse();

  for (let i of line3) i.reverse();

  for (let i of line4) i.reverse();

  for (let i of line5) i.reverse();

  for (let i of line6) i.reverse();

  for (let i of line8) i.reverse();

  window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") getRoute();
  });

  main();
});

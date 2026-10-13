const charts = [
  { id: "#chart1", spec: "specs/chart1_index.vg.json" },
  { id: "#chart2", spec: "specs/chart2_connected.vg.json" },
  { id: "#chart3", spec: "specs/chart3_flow.vg.json" },
  { id: "#chart4", spec: "specs/chart4_slope.vg.json" },
  { id: "#chart5", spec: "specs/chart5_stream.vg.json" }
];

charts.forEach(({ id, spec }) => {
  vegaEmbed(id, spec, { actions: false, renderer: "svg" })   // actions:false hides "Open in Vega Editor"
    .catch(error => document.querySelector(id).textContent = error);
});
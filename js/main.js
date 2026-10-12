const charts = [
  { id: "#chart1", spec: "specs/chart1_index.vg.json" },
  { id: "#chart2", spec: "specs/chart2_xxx.vg.json" },
  { id: "#chart3", spec: "specs/chart3_xxx.vg.json" }
];

charts.forEach(({ id, spec }) => {
  vegaEmbed(id, spec, { actions: false, renderer: "svg" })   // actions:false hides "Open in Vega Editor"
    .catch(error => document.querySelector(id).textContent = error);
});
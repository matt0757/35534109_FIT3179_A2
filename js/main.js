const charts = [
  { id: "#chart1", spec: "specs/chart1_index.vg.json" },
  { id: "#chart2", spec: "specs/chart2_connected.vg.json" },
  { id: "#chart3", spec: "specs/chart3_flow.vg.json" },
  { id: "#chart4", spec: "specs/chart4_slope.vg.json" },
  { id: "#chart5", spec: "specs/chart5_stream.vg.json" },
  { id: "#chart6", spec: "specs/chart6_heatmap.vg.json" },
  { id: "#chart7a", spec: "specs/chart7a_purpose.vg.json" },
  { id: "#chart7b", spec: "specs/chart7b_duration.vg.json" },
  { id: "#chart8", spec: "specs/chart8_horizon.vg.json" },
  { id: "#chart9", spec: "specs/chart9_quadrant.vg.json" },
  { id: "#chart10", spec: "specs/chart10_butterfly.vg.json" },
  { id: "#chart11", spec: "specs/chart11_choropleth.vg.json" },
  { id: "#chart12", spec: "specs/chart12_symbols.vg.json" },
  { id: "#chart13", spec: "specs/chart13_treemap.vg.json" }
];

const views = {};

// Draw (or redraw) one chart. Clearing the container first means the new chart is
// measured against the page layout, not against the size of the old chart.
function draw({ id, spec }) {
  const el = document.querySelector(id);
  if (!el) return;
  if (views[id]) { views[id].finalize(); delete views[id]; }
  el.innerHTML = "";
  vegaEmbed(id, spec, { actions: false, renderer: "svg" })   // actions:false hides "Open in Vega Editor"
    .then(result => { views[id] = result.view; })
    .catch(error => el.textContent = error);
}

charts.forEach(draw);

// Redraw every chart once the window has stopped being resized (for example when a
// browser tab is dragged to half the screen and back). Vega's own resize handling
// does not always re-measure the column after the layout changes.
let resizeTimer;
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      charts.forEach(draw);
    }
  }, 250);
});
const fs=require('fs');const {topology}=require('topojson-server');const {presimplify,simplify,quantile}=require('topojson-simplify');
const g=JSON.parse(fs.readFileSync('states.geojson'));
const code={ 'New South Wales':'NSW','Victoria':'Vic','Queensland':'Qld','South Australia':'SA','Western Australia':'WA','Tasmania':'Tas','Northern Territory':'NT','Australian Capital Territory':'ACT'};
g.features.forEach(f=>{f.properties={state:code[f.properties.STATE_NAME],name:f.properties.STATE_NAME}});
let t=topology({states:g},1e5); t=presimplify(t); t=simplify(t,quantile(t,0.08));
fs.writeFileSync('data/australia-states.json',JSON.stringify(t));
console.log(fs.statSync('data/australia-states.json').size);
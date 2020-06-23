// Make map
const myMap = L.map('issMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })

// Make marker with icon
var issIcon = L.icon({
  iconUrl: 'img/iss_icon.png',
  iconSize: [100, 100],
  iconAnchor: [150, 0],
});

const marker =   L.marker([0, 0], {icon: issIcon}).addTo(myMap);

let firstRun = true;

tiles.addTo(myMap)





// Get JSON from endpoint
async function getISS() {
  const url = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles'

  const response = await fetch(url)
  // Convert response to JSON
  const data = await response.json()

  // Update marker location
  const { latitude, longitude, altitude } = data;
  marker.setLatLng([latitude, longitude])

  // Update map view
  if(firstRun){
    myMap.setView([latitude, longitude], 5)
    firstRun = false;
  } else {
    myMap.setView([latitude, longitude])

  }

  // Update display
document.querySelector('#lat').textContent = latitude.toFixed(4)
document.querySelector('#lng').textContent = longitude.toFixed(4)
document.querySelector('#alt').textContent = altitude.toFixed(1)
setTimeout(getISS, 1500)

}



getISS()



const map = L.map('map').setView([52.60773878985126, 39.609789848327644], 15)
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)

let southWest = L.latLng(52.598851040012164, 39.59506988525391),
northEast = L.latLng(52.61662473632313, 39.624509811401374),
bounds = L.latLngBounds(southWest, northEast)

// map.setMaxBounds(bounds)
map.setMinZoom(15)
map.on('drag', function() {
  map.panInsideBounds(bounds, { animate: false })
  console.log(map.getCenter());
})

map.on('click', function(event) {
  console.log(event)
})

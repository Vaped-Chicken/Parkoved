import {send_get_request_to_api} from './utility.js'

const map = L.map('map').setView([52.60773878985126, 39.609789848327644], 15)
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)

let southWest = L.latLng(52.598851040012164, 39.59506988525391),
northEast = L.latLng(52.61662473632313, 39.624509811401374),
bounds = L.latLngBounds(southWest, northEast)

map.setMaxBounds(bounds)
map.setMinZoom(15)
map.on('drag', function() {
  map.panInsideBounds(bounds, { animate: false })
})

const LeafIcon = L.Icon.extend({
    options:{
        // shadowUrl: 'leaf-shadow.png', // ТУТ можно намутить тень для иконки
        iconSize:     [30, 40], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [15, 45], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
    }
})

const attractionIcon = new LeafIcon({iconUrl: "/static/images/111111.png"})



    // specify popup options
    let customOptions =
        {
        'maxWidth': '300',
        'className' : 'custom'
        }

send_get_request_to_api('/api/v1/attraction/').then( result =>{
  result.forEach(el =>{
    if (el.altitude && el.longitude){

      let photo = el.photo_list[0]
      console.log(el)

      send_get_request_to_api(`/api/v1/photo/${photo}`).then( result => {
        if (result.photo){
          let photo_url = result.photo.replace('http://192.168.2.30:8000/','')
          let customPopup = `Аттракцион: ${el.name} <br/><img src='${photo_url}' alt='maptime logo gif' width='250px' height='200px'/>`
          let attractionMarker = new L.Marker([el.altitude,el.longitude],{
                                                    icon: attractionIcon,
                                                    id: el.id,
                                                    type: 'attraction'
                                                })
                                                .bindPopup(customPopup,customOptions)
                                                // .bindPopup(`Аттракцион ${el.name}`)
                                                .addTo(map)
        }
      })

    let antPolyline = new L.Polyline.AntPath([[52.60567991153733,39.5998764038086],
                                              [52.605341099502496,39.603309631347656],
                                              [52.605901441066074,39.60667848587037],
                                              [52.60670936279315,39.61212873458863],
                                              [52.60574506739741,39.61560487747193]], {color: 'red', weight: 5});

    antPolyline.addTo(map);

    }
  })
})

let mapToken = mapTokenValue

console.log(mapToken)
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 11 // starting zoom
});

console.log(coordinates)

const marker1 = new mapboxgl.Marker({color: "red"})
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML("<p>Exact location provided after booking</p>"))
    .addTo(map);

    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));

    const nav = new mapboxgl.NavigationControl({
        visualizePitch: true
    });
    map.addControl(nav, 'bottom-right');
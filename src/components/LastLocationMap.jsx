import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const MAPBOX_TOKEN = "pk.eyJ1IjoiaXNoYW50Z3VwdGE3NzciLCJhIjoiY2p5NDI5aXFpMTVvaDNnbGVhbTllZ2R3MyJ9.ndww9Z602MqyVtoiexGXqQ"

export default function HeatMap() {
	const [ viewport, setViewport ] = useState({
		width: '90%',
		height: '50vh',
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 15
	});
    const [marker,setMarker] = useState({
        lat : 37.785164,
        long : 100
    })
    
    useEffect(() => {
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					setViewport({
						...viewport,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude
					});
					setMarker({
						lat: pos.coords.latitude,
						long: pos.coords.longitude
                    });
				});
			}
		}
		getLocation();
	}, []);

	return ( 
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onViewportChange={(viewport=>setViewport(viewport))}
            mapStyle="mapbox://styles/ishantgupta777/ck5zjfpzo0ysy1ipccqjbo3ix"
		>
        <Marker
            longitude={marker.long}
            latitude={marker.lat}
            offsetTop={-20}
            offsetLeft={-10}
            onDragEnd={(e)=>{setMarker({lat:e.lngLat[1],long:e.lngLat[0]})}}
            draggable
        >
         <img
            src={require('../assets/img/blue_map_marker.png')}
            alt="current_location"
            style={{ width: '30px' }}
            draggable={false}
		/>
        </Marker>

		</ReactMapGL>
	);
}

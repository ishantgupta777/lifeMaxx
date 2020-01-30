import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const MAPBOX_TOKEN = "pk.eyJ1IjoiaXNoYW50Z3VwdGE3NzciLCJhIjoiY2p5NDI5aXFpMTVvaDNnbGVhbTllZ2R3MyJ9.ndww9Z602MqyVtoiexGXqQ"

export default function HeatMap() {
	const [ viewport, setViewport ] = useState({
		width: '100%',
		height: '85vh',
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 15
	});

	const [ currentPosition, setCurrentPosition ] = useState({
		lat: 37.7577,
		long: -122.4376
	});

	useEffect(() => {
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					setViewport({
						...viewport,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude
					});
					setCurrentPosition({
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
			onViewportChange={setViewport}
			mapStyle="mapbox://styles/ishantgupta777/ck5zjfpzo0ysy1ipccqjbo3ix"
		>
			{currentPosition.lat && (
				<Marker latitude={currentPosition.lat} longitude={currentPosition.long} draggable>
					<img
						src={require('../assets/img/blue_map_marker.png')}
						alt="current_location"
						style={{ width: '30px' }}
					/>
				</Marker>
			)}
		</ReactMapGL>
	);
}

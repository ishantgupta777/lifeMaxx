import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useStateValue } from '../context/LastLocationContext';
import axios from 'axios';

const MAPBOX_TOKEN =
	'pk.eyJ1IjoiaXNoYW50Z3VwdGE3NzciLCJhIjoiY2p5NDI5aXFpMTVvaDNnbGVhbTllZ2R3MyJ9.ndww9Z602MqyVtoiexGXqQ';

export default function HeatMap() {
	const [ viewport, setViewport ] = useState({
		width: '90%',
		height: '50vh',
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 17
	});
	const [ marker, setMarker ] = useState({
		lat: 15.391504500000002,
		long: 73.87694239999999
	});
	const [ currentPosition, setCurrentPosition ] = useState({
		lat: 15.391504500000002,
		long: 73.87694239999999
	});

	useEffect(() => {
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					setViewport({
						...viewport,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
						zoom: 17
					});
					setMarker({
						lat: pos.coords.latitude,
						long: pos.coords.longitude
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

	const [ lastLocation, useLastLocation ] = useStateValue();

	useEffect(
		() => {
			const getLatLang = async () => {
				const response = await axios.get(
					`http://www.mapquestapi.com/geocoding/v1/address?key=ekC8XsButuiKAx0FzPDfCxNBxOeZoZPV&location=${lastLocation}`
				);
				if (response.data.results[0].locations[0]) {
					var lat = response.data.results[0].locations[0].latLng.lat;
					var long = response.data.results[0].locations[0].latLng.lng;
					setViewport({
						...viewport,
						latitude: lat,
						longitude: long,
						zoom: 17
					});
					setMarker({
						lat,
						long
					});
				} else if (!lastLocation) {
					setViewport({
						...viewport,
						latitude: currentPosition.lat,
						longitude: currentPosition.long,
						zoom: 17
					});
					setMarker({
						lat: currentPosition.lat,
						long: currentPosition.long
					});
				}
			};
			getLatLang();
		},
		[ lastLocation ]
	);

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={MAPBOX_TOKEN}
			onViewportChange={(viewport) => setViewport(viewport)}
			mapStyle="mapbox://styles/ishantgupta777/ck5zjfpzo0ysy1ipccqjbo3ix"
		>
			<Marker
				longitude={marker.long}
				latitude={marker.lat}
				offsetTop={-20}
				offsetLeft={-10}
				onDragEnd={(e) => {
					setMarker({ lat: e.lngLat[1], long: e.lngLat[0] });
				}}
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

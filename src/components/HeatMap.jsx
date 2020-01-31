import React, { useState, useEffect, useRef, Fragment } from 'react';
import ReactMapGL, { Marker,FlyToInterpolator } from 'react-map-gl';
import axios from 'axios';
import './HeatMap.css'
import useSupercluster from 'use-supercluster'

const MAPBOX_TOKEN =
	'pk.eyJ1IjoiaXNoYW50Z3VwdGE3NzciLCJhIjoiY2p5NDI5aXFpMTVvaDNnbGVhbTllZ2R3MyJ9.ndww9Z602MqyVtoiexGXqQ';

export default function HeatMap() {
	const [ viewport, setViewport ] = useState({
		width: '100%',
		height: '85vh',
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 2
	});

	const [ currentPosition, setCurrentPosition ] = useState({
		lat: 37.7577,
		long: -122.4376
	});

	const [ missingPeople, setMissingPeople ] = useState([]);

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

		const getMissingPeople = async () => {
			var res = await axios.get('/unsafePeople');
			res = res.data.map((person) => {
				return {
					type: 'Feature',
					properties: {
						cluster: false,
						personId: person._id,
						category: 'missing people'
					},
					geometry: { type: 'Point', coordinates: person.lastLocation.reverse() }
				};
			});

			setMissingPeople(res);
		};
		getMissingPeople();
	}, []);

	const mapRef = useRef();

	const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

	const { clusters, supercluster } = useSupercluster({
		points : missingPeople,
		bounds,
		zoom: viewport.zoom,
		options: { radius: 75, maxZoom: 20 }
	  });
	  
	return (
		<Fragment>
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				onViewportChange={setViewport}
				mapStyle="mapbox://styles/ishantgupta777/ck5zjfpzo0ysy1ipccqjbo3ix"
				maxZoom={20}
				ref={mapRef}
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
				{clusters.map(cluster => {
					const [longitude, latitude] = cluster.geometry.coordinates;
					const {
					cluster: isCluster,
					point_count: pointCount
					} = cluster.properties;
					console.log(viewport.zoom);
					// we have a cluster to render
					if (isCluster) {
					return (
						<Marker
						key={`cluster-${cluster.id}`}
						latitude={latitude}
						longitude={longitude}
						>
						<div
							className="cluster-marker"
							style={{
							width: `${20 + (pointCount / missingPeople.length) * 20}px`,
							height: `${20 + (pointCount / missingPeople.length) * 20}px`
							}}
							onClick={() => {
								const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id),20)
						  
								setViewport({
								  ...viewport,
								  latitude,
								  longitude,
								  zoom: expansionZoom,
								  transitionInterpolator: new FlyToInterpolator({
									speed: 2
								  }),
								  transitionDuration: "auto"
								});
							  }}
						>
							{pointCount}
						</div>
						</Marker>
					);
					}

					return (
					<Marker
						key={`person-${cluster.properties.personId}`}
						latitude={latitude}
						longitude={longitude}
					>
						<button className="person-marker">
								<img
							src={require('../assets/img/red_map_marker.png')}
							alt="current_location"
							style={{ width: '30px' }}
							draggable={false}
						/>
						</button>
					</Marker>
					);
				})}
			</ReactMapGL>
		</Fragment>
	);
}

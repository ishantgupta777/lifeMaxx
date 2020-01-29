import React from 'react';
import mapboxgl from 'mapbox-gl';
import cmdata from './trees.geojson';

class ClusterMap extends React.Component{
    constructor(props){
        super(props);
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1bm1lcmEiLCJhIjoiY2s1d250M2ppMTRwcTNtbXhwYjhxMzZncCJ9.g58k81HwvrrIG-1tjAHKAw';
        this.state = {
            lng:5,
            lat:34,
            zoom:12,
        };
    }

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
                const map = new mapboxgl.Map({
                    container: document.querySelector("#clusterMap"),
                    center: [-79.999732, 40.4374],
                    style: 'mapbox://styles/mapbox/dark-v10',
                    zoom: this.state.zoom,
                });

                map.on('load', () => {
                    map.addSource('trees', {
                        type: 'geojson',
                        data: cmdata, 
                        cluster: true,
                        clusterMaxZoom: 14, // Max zoom to cluster points on
                        clusterRadius: 50   //data for density in geojson format
                    })

                    map.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'trees',
                        filter: ['has', 'point_count'],
                        paint: {
                            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                            // with three steps to implement three types of circles:
                            //   * Blue, 20px circles when point count is less than 100
                            //   * Yellow, 30px circles when point count is between 100 and 750
                            //   * Pink, 40px circles when point count is greater than or equal to 750
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                            ],
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });
            
                    map.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'trees',
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': '{point_count_abbreviated}',
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        }
                    });
            
                    map.addLayer({
                        id: 'unclustered-point',
                        type: 'circle',
                        source: 'trees',
                        filter: ['!', ['has', 'point_count']],
                        paint: {
                            'circle-color': '#11b4da',
                            'circle-radius': 4,
                            'circle-stroke-width': 1,
                            'circle-stroke-color': '#fff'
                        }
                    });
            
                    // inspect a cluster on click
                    map.on('click', 'clusters', function(e) {
                        var features = map.queryRenderedFeatures(e.point, {
                            layers: ['clusters']
                        });
                        var clusterId = features[0].properties.cluster_id;
                        map.getSource('trees').getClusterExpansionZoom(
                            clusterId,
                            function(err, zoom) {
                                if (err){
                                    console.log(err);
                                    return;
                                }
            
                                map.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom
                                });
                            }
                        );
                    });
            
                    map.on('mouseenter', 'clusters', function() {
                        map.getCanvas().style.cursor = 'pointer';
                    });
                    map.on('mouseleave', 'clusters', function() {
                        map.getCanvas().style.cursor = '';
                    });
                });
            });
        }

    render(){
        return(<div style={{height: '50vh', width: '50vh'}} id="clusterMap">

        </div>
        );
    }
}

export default ClusterMap;
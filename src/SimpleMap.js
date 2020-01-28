import React from 'react';
import mapboxgl from 'mapbox-gl';
import faker from 'faker';

class SimpleMap extends React.Component{
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
                    container: document.querySelector("#map"),
                    center: [this.state.lng, this.state.lat],
                    style: 'mapbox://styles/kaunmera/ck5wwga4d18h11ink5xtymlkz',
                    zoom: this.state.zoom,
                });
                var marker = new mapboxgl.Marker({
                    draggable: true
                    })
                    .setLngLat([this.state.lng, this.state.lat])
                    .addTo(map);
                     
                    var onDragEnd = () => {
                    var lngLat = marker.getLngLat();
                    this.setState({lat: lngLat.lat, lng: lngLat.lng});
                    }
                marker.on('dragend', onDragEnd);
             
            },
            err => this.setState({lat: faker.address.latitude(), lng: faker.address.longitude()}));
    }
    
    componentDidUpdate(){

    }

    render(){
        return(<div style={{height: '50vh', width: '50vh'}} id="map">

        </div>
        );
    }

}

export default SimpleMap;
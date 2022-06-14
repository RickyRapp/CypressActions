import React, { Component, useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';
import './Marker.css';
import {connect} from 'react-redux';
import Geocode from "react-geocode"; 



const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Map = props => { 
  const [thislng, setThislng] = useState(null)
  const [thislat, setThislat] = useState(null) 
  const [currentLng, setCurrentlng] = useState(null)
  const [currentLat, setCurrentlat] = useState(null) 
  const [center, setCenter] = useState(null) 
  const [allRestaurantCoords, setAllRestaurantCoords] = useState([]) 
  
  function getCoords (){  
    return props.restaurants.restaurants.map(function (restaurant)  { 
      const authKey = process.env.MAP_API 
      Geocode.setApiKey("AIzaSyByvZEhbhUOwuNnMkiOmz6LRDG9hmz2BnM") 
      Geocode.enableDebug();
      const address = restaurant.address; 
      Geocode.fromAddress(address).then(
        (response) => {  
          setAllRestaurantCoords(allRestaurantCoords => [...allRestaurantCoords, 
            {lat:response.results[0].geometry.location.lat,
            lng:response.results[0].geometry.location.lng,
            label:restaurant.name}])  
        },
        (error) => {
          console.error(error);
        }
      );   
    }); 
  }
 
 

  useEffect(() =>{
    setAllRestaurantCoords([])
    getCoords(); 
    Geocode.setApiKey("AIzaSyByvZEhbhUOwuNnMkiOmz6LRDG9hmz2BnM")
    Geocode.enableDebug();  
    const address = !props.currentRestaurant?"1777 Ave of the States, Lakewood, NJ 08701":props.currentRestaurant.address
    Geocode.fromAddress(address).then(
      (response) => {
        const lat = response.results[0].geometry.location.lat;
        const lng = response.results[0].geometry.location.lng;
        setCenter({lat:lat, lng:lng}) 
        setThislng(lng)
        setThislat(lat) 
      },
      (error) => {
        console.error(error);
      }
    ); 
  },[props.currentRestaurant]) 
  
    return (
      <div className="c-map" style={{ height: '50vh', width: '50%' }}> 
        <GoogleMapReact 
          center={center}
          defaultZoom={20}
          maxZoom={100}
          minZoom={0}
        >
        <AnyReactComponent
            lat={thislat}
            lng={thislng}
            text={<div className="innerText">{props.currentRestaurant.name}</div>}
          />    
          {allRestaurantCoords.map((coords)=>{return  <Marker currentLabel={props.currentRestaurant.name} label={coords.label} lat={coords.lat} lng={coords.lng} />})}
    </GoogleMapReact>
      </div>
    )
 // }
}



const mapStateToProps = state => {
  return {
     currentRestaurant: state.currentRestaurant 
  } 
}

export default connect(mapStateToProps) (Map);
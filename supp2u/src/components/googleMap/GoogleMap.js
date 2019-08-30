import React, {createRef,} from 'react';
import "./style.sass"
import { mapStyle } from "./MapStyles";

import Marker from "./Marker";
class GoogleMaps extends React.Component{
  map ={};
  mapRef = createRef();
  createGoogleMap = () =>{
    this.map = new window.google.maps.Map(this.mapRef.current, {
      zoom: 12,
      center:{
        lat:39.727066,
        lng: -104.981963
      },
      styles: mapStyle
    });
  };
  componentDidMount() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", ()=>{
      this.googleMap = this.createGoogleMap();
      Marker(this.map, this.props.positions)
    })
  
  }
  componentDidUpdate(nextProps, nextState, nextContext) {
    if(nextProps.positions !== this.props.positions){
      Marker(this.map, this.props.positions)
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.positions.length !== this.props.positions.length){
  //     console.log("*********** componentDidUpdate ***********");
  //     Marker(this.map, this.props.positions)
  //   }
  // }

  componentWillUnmount() {
    delete this.map;
    delete window.google;
  }

  render(){
    return <div id={"google-map"} className={"map"} ref={this.mapRef}/>
  }
}

export default GoogleMaps;
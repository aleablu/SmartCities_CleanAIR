import React, { Component } from 'react'
import {Map, TileLayer, ZoomControl, Circle} from 'react-leaflet'
import { Select, Icon, Button } from 'semantic-ui-react'
import '../App.css'
import {subscribeToAir} from '../api'
import "react-toggle/style.css"
import SearchPlaces from '../misc/SearchPlaces';
// IMPORTANT: nomintim-browser is only included in dev dependencies
import * as Nominatim from 'nominatim-browser';
//box lessandria [[[8.5940446495,44.887568074],[8.6438264488,44.887568074],[8.6438264488,44.931760275],[8.5940446495,44.931760275],[8.5940446495,44.887568074]]]
export default class BaseMap extends Component{
  constructor(props){
    super(props)
    this.state={
      zoom: 14.00,
      center: [44.9129225, 8.615321],
    }
  }



  render(){
    return(
      <div style={{position: 'relative'}}>
        <SearchPlaces handleLocationSelected={this.handleLocationSelected}/>
        <Map center={this.state.center} zoom={this.state.zoom} style={{height: window.innerHeight, width: window.innerWidth, zIndex: 0}} zoomControl={false}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={this.state.center} fillColor="yellow" radius={200}/>
          <Circle center={[44.9198, 8.6165]} fillColor="yellow" radius={200}/>
          <Circle center={[44.9184, 8.6286]} fillColor="red" radius={200}/>
          <Circle center={[44.9101, 8.6278]} fillColor="red" radius={200}/>
          <Circle center={[44.8965, 8.5982]} fillColor="red" radius={200}/>
          <ZoomControl position="topright"/>
        </Map>

      </div>
    )
  }

}

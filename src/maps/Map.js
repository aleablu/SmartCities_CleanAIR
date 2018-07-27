import React, { Component } from 'react'
import {Map, TileLayer, ZoomControl, Circle} from 'react-leaflet'
import MarkersLayout from './MarkersLayout'
import { Select, Popup, Icon, Button } from 'semantic-ui-react'
import '../App.css'
import {subscribeToAir} from '../api'
import Toggle from 'react-toggle'
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
      focus: 'Nessuna',
      center: [44.9129225, 8.615321],
      markers: [],
      isMonitoringActive: true,
      isFocusEnabled: false

    }
    this.handleLocationSelected = this.handleLocationSelected.bind(this);
    this.handleMonitoringChange = this.handleMonitoringChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.stopFocusing = this.stopFocusing.bind(this);
  }

  componentDidMount(){
    //avvio socket.io, la callback che gli passo viene eseguita quando riceve un messaggio dal broker
    subscribeToAir((message) => {
      console.log(message);
      //se il monitoraggio è attivo, aggiungo il messaggio allo state così che possa essere renderizzato come marker, altrimenti lo ignoro
      if(this.state.isMonitoringActive){
        //aggiorno il centro della mappa, se riguarda un messaggio relativo alla stazione che si sta seguendo
        if(this.state.focus===message.station){
          this.setState({center: [message.position.lat,message.position.lon], zoom: 15.2});
        }
        let tmp = this.state.markers;
        tmp.push(message);
        this.setState({
          markers: tmp
        });
      }
    })
  }

  handleFocusChange(data){
    this.setState({focus: data, isFocusEnabled: true})
  }
  handleLocationSelected(suggest){
    this.setState({center: [suggest.location.lat, suggest.location.lon]});
  }
  handleMonitoringChange(e){
    this.setState({isMonitoringActive: e.target.checked})
  }
  stopFocusing(){
    this.setState({focus: 'Nessuna', isFocusEnabled: false})
  }
  render(){
    let followLayout = <span style={{marginRight: '30px'}}/>
    if(this.state.focus !== 'Nessuna'){
      followLayout=(
        <span  className='label-text'
              style={{padding: '5px', verticalAlign:'super', cursor: 'pointer', marginRight: '30px'}}
              onClick={this.stopFocusing}>
              <Popup
                trigger={<Icon bordered={false} name='window close' size='large'/>}
                content='Smetti di seguire'/>
        </span>
      )
    }


    return(
      <div style={{position: 'relative'}}>
        <SearchPlaces handleLocationSelected={this.handleLocationSelected}/>
        <div style={{position:'absolute', zIndex:9, left:'37%', top:'11%', backgroundColor: 'white', boxShadow: '2px 2px 1px grey', padding: '5px', borderRadius:'2px'}}>
          <span className='label-text' style={{padding: '5px', verticalAlign:'super'}}>
            Stai seguendo la stazione: <b>{this.state.focus}</b>
          </span>
          {followLayout}
          <Toggle
            defaultChecked={this.state.isMonitoringActive}
            onChange={this.handleMonitoringChange}
           />
            <span className='label-text' style={{padding: '5px', verticalAlign:'super', textDecoration:'underline'}}>Stato monitoraggio</span>
        </div>
        <Map center={this.state.center} zoom={this.state.zoom} style={{height: window.innerHeight, width: window.innerWidth, zIndex: 0}} zoomControl={false}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright"/>
          <MarkersLayout focus={this.state.focus} markers={this.state.markers} active={this.state.isMonitoringActive} changeFocus={this.handleFocusChange}/>
        </Map>

      </div>
    )
  }

}

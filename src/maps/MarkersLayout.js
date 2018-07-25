import React, { Component } from 'react'
import {Marker,Popup} from 'react-leaflet'
import {Button} from 'semantic-ui-react'

export default class MarkersLayout extends Component{
  render(){
    const layout =
      this.props.markers.map((msg,idx)=>{
          if(this.props.focus === '#'){
            //creo marker per tutti i messaggi che arrivano, di ogni stazione
            return(
                <Marker key={`marker-${idx}`} position={[msg.position.lat,msg.position.lon]}>
                  <Popup>
                      <span>
                        <b>{msg.station}</b> <br/>
                        PM10: {msg.data.PM10} <br/>
                        AQ: {msg.data.AQ} <br/>
                        <a
                          style={{cursor: 'pointer', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold'}}
                          onClick={()=>{this.props.changeFocus(msg.station)}}
                          >
                          Segui
                        </a>
                    </span>
                  </Popup>
                </Marker>
              )
          }else{
            //altrimenti mostro il marker solo per la stazione scelta da usr
            if(msg.station===this.props.focus){
              return(
                  <Marker key={`marker-${idx}`} position={[msg.position.lat,msg.position.lon]}>
                    <Popup>
                        <span>
                          <b>{msg.station}</b> <br/>
                          PM10: {msg.data.PM10} <br/>
                          AQ: {msg.data.AQ} <br/>
                          <a
                            style={{cursor: 'pointer', textAlign: 'center', textDecoration: 'underline', fontWeight: 'bold'}}
                            onClick={()=>{this.props.changeFocus(msg.station)}}
                            >
                            Segui
                          </a>
                      </span>
                    </Popup>
                  </Marker>
                )
            }
          }
      })
      if(layout.length === 0 ){
        return(<div/>)
      }else{
        return(
          <div>
          {layout}
          </div>
        )
    }
  }
}

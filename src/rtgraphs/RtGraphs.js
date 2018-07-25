import React, { Component } from 'react'
import SimpleLineChart from './SimpleLineChart'
import {subscribeToAir} from '../api'
import {Grid, Header, Select} from 'semantic-ui-react'
import {Map, TileLayer} from 'react-leaflet'
import MarkersLayout from '../maps/MarkersLayout'
import SearchPlaces from '../misc/SearchPlaces'

export default class RtGraphs extends Component{
  constructor(props){
    super(props)
    this.state={
      focus:'#',
      data: [],
      center: [44.9132168, 8.6169507],
      zoom: 13.00
    }
    this.focusChange = this.focusChange.bind(this)
    this.handleLocationSelected = this.handleLocationSelected.bind(this)
  }
  componentDidMount(){
    //avvio socket.io, la callback che gli passo viene eseguita quando riceve un messaggio dal broker
    subscribeToAir((message) => {
        //aggiorno il centro della mappa, se riguarda un messaggio selezionato
        if(this.state.focus==='#' || this.state.focus===message.station){
          console.log(message);
          fetch('https://nominatim.openstreetmap.org/reverse.php?format=json&lat='+message.position.lat+'&lon='+message.position.lon)
          .then((res)=>{res.json().then((result)=>{console.log(result);})})
          this.setState({center: [message.position.lat,message.position.lon]});
        }
    });
  }
  focusChange(e, data){
    this.setState({focus: data.value})
  }
  handleLocationSelected(suggest){
    this.setState({center: [suggest.location.lat, suggest.location.lon]});
  }
  render(){
    return(
      <Grid container centered columns={1} style={{padding: '1%'}}>
        <Grid.Row>
          <Header as="h2">Analisi Real Time dei dati</Header>

        </Grid.Row>
        <Grid.Row>
          <SearchPlaces handleLocationSelected={this.handleLocationSelected}/>
          <Select placeholder='Tutte le stazioni'
                  options={[{key:'1', value:'Stazione1', text:'Autobus1'},
                            {key:'2', value:'Stazione2', text:'Autobus2'},
                            {key:'3', value:'Stazione3', text:'Autobus3'},
                            {key:'4', value:'Stazione4', text:'Autobus4'},
                            {key:'5', value:'Stazione5', text:'Autobus5'},
                            {key:'6', value:'#', text:'Tutte le stazioni'}]}
                  onChange={this.focusChange}
          />
        </Grid.Row>
        <Grid.Row>
            <SimpleLineChart focus={this.state.focus} data={this.state.data}/>
        </Grid.Row>
        <Grid.Row style={{height: '400px'}}>

            <Map center={this.state.center} zoom={this.state.zoom} style={{width: '100%', height: '100%', position:'absolute'}}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkersLayout focus={this.state.focus} markers={this.state.data}/>
            </Map>
        </Grid.Row>
      </Grid>
    )
  }
}

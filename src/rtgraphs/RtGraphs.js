import React, { Component } from 'react'
import SimpleLineChart from './SimpleLineChart'
import {subscribeToAir} from '../api'
import {Grid, Header, Container, Segment} from 'semantic-ui-react'
import {Map, TileLayer} from 'react-leaflet'
import MarkersLayout from '../maps/MarkersLayout'
import SearchPlaces from '../misc/SearchPlaces'
import MapCirc from '../MapCircles/MapCirc'
import DatePicker from 'react-datepicker';
import moment from 'moment';


import 'react-datepicker/dist/react-datepicker.css';

export default class RtGraphs extends Component{
  constructor(props){
    super(props)
    this.state={
      focus:'#',
      data: [],
      center: [44.9132168, 8.6169507],
      zoom: 13.00,
      datePicked: ''
    }
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(){
    return null;
  }
  render(){
    return(
      <Grid container centered columns='equal' style={{padding: '1%'}}>
        <Grid.Row>
          <Header as="h2">Analisi dati storici aria</Header>

        </Grid.Row>
        <Grid.Row>
          <Container>
            Qua puoi visualizzare i livelli di inquinanti sulla mappa considerando le segnalazioni solamente da una certa data in poi!
          </Container>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
          <Segment>
            <SimpleLineChart focus={this.state.focus} data={this.state.data}/>
          </Segment>
          </Grid.Column>
          <Grid.Column>
          <Segment>
            Seleziona una data:<DatePicker selected={this.state.datePicked} onChange={this.handleChange} style={{marginLeft: '50px'}}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{height: '400px'}}>
            <MapCirc/>
        </Grid.Row>
      </Grid>
    )
  }
}

import React, {Component} from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

export default class SimpleLineChart extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  /*struttura messaggio mqtt
    messaggio ricevuto -> aria/Autobus5/{
      "station":"Autobus5",
      "position":{
            "lat":44.8912,
            "lon":8.69891,
            "v":0
          },
      "data":{
            "PM10":88,
            "AQ":47
          },
      "time":"180516141923"
    }*/

  componentWillMount(){
    let out=[]
    this.props.data.map((message)=>{
      out.push({
        time: message.station.time,
        PM10: message.data.PM10,
        AQ: message.data.AQ
      })
    })
    this.setState({
      data: out
    })
  }
	render () {
  	return (
    	<LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="time"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="PM10" stroke="#8884d8"/>
       <Line type="monotone" dataKey="AQ" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

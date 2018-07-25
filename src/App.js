import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Link } from 'react-router-dom'
import {reveal as Menu} from 'react-burger-menu'
import BaseMap from './maps/Map'
import PaneExample from './maps/prova'
import History from './history/History'
import RtGraphs from './rtgraphs/RtGraphs'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)

  }

  render() {
    var styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '65px',
        top: '36px'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }
    return (
      <HashRouter>
        <div id="outer-container">
          <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} styles={styles} >
            <Link className="menu-item" to="/map">Mappa rilevazioni in tempo reale</Link>
            <Link className="menu-item" to="/rtgraphs">Analisi dati in tempo reale</Link>
            <Link className="menu-item" to="/history">Storico</Link>
          </Menu>
          <div id="page-wrap">
            <Route exact path="/" render={() => (
                <Redirect to="/map" />
            )}/>
            <Route path="/map" component={BaseMap}/>
            <Route path="/rtgraphs" component={RtGraphs}/>
            <Route path="/history" component={History}/>
            <Route path="/e" component={PaneExample}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

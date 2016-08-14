import React from 'react';
import mapboxgl from 'mapbox-gl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Source, Map, Symbol, Circle } from 'maps-react';

import * as actions from '../redux/actions';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3VzaGFuMjAyMCIsImEiOiJjaWw5dG56enEwMGV6dWVsemxwMWw5NnM5In0.BbEUL1-qRFSHt7yHMorwew';

function mapStatetoProps(state) {
  return { ...state.reducer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function swapArray(array) {
  return [array[1], array[0]];
}

@connect(mapStatetoProps, mapDispatchToProps)
export default class Maps extends React.Component {
  foo() {

  }
  shouldComponentUpdate(nextProps) {
    if (this.map
      && (nextProps.location.coords[0] !== this.props.location.coords[0]
         || nextProps.location.coords[1] !== this.props.location.coords[1])) {
      this.map.flyTo({

        center: swapArray(nextProps.location.coords),
        bearing: 0,
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 3.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
      });
    }
    return true;
  }
  render() {
    if (!this.props.location.coords) return null;
    const data = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: swapArray(this.props.location.coords),
        },
        properties: {
          title: 'You',
          kind: 'current',
        },
      },
    ],
    };
    if (this.props.node.nearByNodes) {
      const nodes = this.props.node.nearByNodes.map((n) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: swapArray(n.coords),
        },
        properties: {
          title: 'Text',
          kind: 'node',
        },
      }));
      data.features = data.features.concat(nodes);
    }
    return (
      <Map
        style="mapbox://styles/mapbox/dark-v9"
        center={swapArray(this.props.location.coords)}
        zoom={18}
        mapboxgl={mapboxgl}
        onLoad={(map) => { this.map = map; }}
      >
        <Source
          name="markers"
          type="geojson"
          data={data}
        >
          <Circle
            name="pointer"
            paint={{
              'circle-color': '#51bbd6',
              'circle-radius': 12,
            }}
            filter={['==', 'kind', 'current']}
          />
          <Circle
            name="pointer2"
            paint={{
              'circle-color': '#f28cb1',
              'circle-radius': 7,
              'circle-opacity': 0.8,
            }}
            filter={['==', 'kind', 'node']}
          />

        </Source>
      </Map>
    );
  }
}

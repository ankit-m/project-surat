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
  static propTypes = {
    node: React.PropTypes.object,
    setActiveNode: React.PropTypes.func,
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
  handleClick = (e, query, map) => {
    const x1y1 = [e.point.x - 1, e.point.y - 1];
    const x2y2 = [e.point.x + 1, e.point.y + 1];
    const feat = query([x1y1, x2y2]);
    if (feat.length > 0) {
      if (feat[0].properties.kind === 'node') {
        this.props.setActiveNode(feat[0].properties.id);
        const popup = new mapboxgl.Popup()
       .setLngLat(feat[0].geometry.coordinates)
       // this will be pure html, dont do react in this one
       .setHTML(`<div class="map-popup">${feat[0].properties.data}</div>`)
       .addTo(this.map);
      }
    }
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
          id: n.id,
          coords: swapArray(n.coords),
          data: n.data,
        },
      }));
      data.features = data.features.concat(nodes);
    }
    return (
      <Map
        style="mapbox://styles/mapbox/dark-v9"
        center={swapArray(this.props.location.coords)}
        zoom={16}
        mapboxgl={mapboxgl}
        onLoad={(map) => {
          this.map = map;
          map.on('mousemove', function (e) {
            const features = map.queryRenderedFeatures(e.point, { layers: ['pointer2'] });
            map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
          });
        }}
      >
        <Source
          name="markers"
          type="geojson"
          data={data}
          onClick={this.handleClick}
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

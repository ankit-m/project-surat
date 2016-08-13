import React from 'react';
import { Blob } from './Blob';
import { getCurrentPosition, watchCurrentPosition } from '../core/GeoLocation';
import { getSquareCoords, getNodesFromSquare, coordsToId } from '../core/NodeFunctions';

export default class BlobLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state.displayState = [];
  }

  componentDidMount() {
    // Finds the square around the location. Finds nodes based on that square!
    const squareCoords = getSquareCoords(getCurrentPosition());
    const squareId = coordsToId(squareCoords);
    const nodesInSquare = getNodesFromSquare(squareId);
    this.updateDisplay(nodesInSquare);
  }

  updateDisplay(nodes) {
    console.log(nodes);
    // Blob can be called here with appropriate arguments from nodesInSquare
    // The result can be stored in displayState.

    // This function can be called when watchCurrentPosition also changes. This will change display state and
    // re-renders the cycle
  }

  render() {
    const display = this.state.displayState;
    return (
      { display }
    );
  }
}

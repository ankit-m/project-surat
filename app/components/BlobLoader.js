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
    watchCurrentPosition(this.updateDisplay);
    this.updateHDisplay();
  }

  updateDisplay() {
    const self = this;
    getCurrentPosition().then((result) => {
      console.log(result);
      const squareCoords = getSquareCoords();
      const squareId = coordsToId(squareCoords);
      const nodesInSquare = getNodesFromSquare(squareId);
      self.setState({ displayState: nodesInSquare });
    });

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

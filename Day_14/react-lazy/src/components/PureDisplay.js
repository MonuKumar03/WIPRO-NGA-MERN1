import React, { PureComponent } from 'react';

class PureDisplay extends PureComponent {
  render() {
    console.log('PureDisplay rendered with value:', this.props.value);
    
    return (
      <div className="pure-display">
        <h4>Pure Component</h4>
        <p>Current value: {this.props.value}</p>
        <p>This component only re-renders when props actually change.</p>
      </div>
    );
  }
}

export default PureDisplay;
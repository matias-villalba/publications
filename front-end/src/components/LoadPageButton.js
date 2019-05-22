import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class LoadPageButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.load();
  }
  render() {
    return (
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          {this.props.label}
        </Button>
    );
  }
}

export default LoadPageButton;
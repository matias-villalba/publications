import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';


const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};


function mapDispatchToProps(dispatch) {
  return {

  };
}
class Search extends Component {
  constructor() {
    super();
    this.state = {
      titleToSearch: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSearch(event) {

    alert(this.state.titleToSearch)
  }


  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root} elevation={1}>

        <InputBase value={this.state.titleToSearch} onChange={e => this.setState({ titleToSearch: e.target.value })}  className={classes.input} placeholder="Enter a publication title to search" />
        <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleSearch} >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} />
      </Paper>
    );
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(Search));
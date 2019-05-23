import React, { Component } from "react";
import { connect } from "react-redux";
import {searchPublicationsByTitle, getData} from "../actions"

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import DirectionsIcon from '@material-ui/icons/Directions';


const styles = {
  root: {
    'margin-bottom': '22px',
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

/*
function mapDispatchToProps(dispatch) {
  return {
    getAllPublications: firstPageQuery => getData(firstPageQuery),

    searchPublicationsByTitle: title => dispatch(searchPublicationsByTitle(title))    
  };
}
*/
const mapDispatchToProps = {
    getData,
    searchPublicationsByTitle  
  }


const mapStateToProps = state => {
  return{
    firstPageQuery: state.pagination.firstPageQuery
  }
  
}

class Search extends Component {
  constructor() {
    super();
    this.state = {
      titleToSearch: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this)
  }
  handleChange(event) {
  }

  handleClear(){
    this.setState({ titleToSearch: '' });
    this.props.getData(this.props.firstPageQuery)
  }
  handleSearch(event) {
    const publicationTitle = this.state.titleToSearch
    this.props.searchPublicationsByTitle({publicationTitle})
  }


  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root} elevation={1}>

        <IconButton onClick={this.handleClear} className={classes.iconButton} aria-label="Clear"  >
          <ClearIcon />
        </IconButton>
        <InputBase value={this.state.titleToSearch} onChange={e => this.setState({ titleToSearch: e.target.value })}  className={classes.input} placeholder="Enter a publication title to search" />
        <IconButton className={classes.iconButton} aria-label="Search" onClick={this.handleSearch} >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} />
      </Paper>
    )
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Search));
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuthors } from "../actions/index";
import Moment from 'react-moment';
import 'moment-timezone';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export class Authors extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getAuthors()
  }
  render() {
    const { classes } = this.props;
    return (
      <List component="nav">
            {this.props.authors.map(author => (

          <ListItem button key={author.id} >
            <ListItemText  primary={ author.firstName.concat(' ').concat(author.lastName)} secondary={author.email} />
            <Divider/>   
          </ListItem>
          

          ))}  
        </List>

    );
  }
}


/*
            {author.firstName}
             {author.lastName}
             {author.email}            
            
             <Moment format="dddd, MMMM Do YYYY">{author.birthdate}</Moment>
             */ 

function mapStateToProps(state) {
  return {
    authors: state.authors
  };
}


export default withStyles(styles) (connect(
  mapStateToProps,
  { getAuthors }
)(Authors))
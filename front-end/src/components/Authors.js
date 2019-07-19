import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAuthors } from "../actions/authors";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AuthorButton from "./AuthorButton"

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
    this.props.fetchAuthors()
  }
  render() {
    const { classes } = this.props;
    return (
      <List component="nav" style={{maxHeight: '825px', overflow: 'scroll'}} >
            {this.props.authors.map(author => (
              <AuthorButton key={author.id} id={author.id} firstName={author.firstName} lastName={author.lastName} email={author.email} birthdate={author.birthdate} />
          ))}  
        </List>

    );
  }
}

function mapStateToProps(state) {
  return {
    authors: state.authors
  }
}

function mapDispatchToProps() {
  return { fetchAuthors }
}

export default withStyles(styles) (connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors))
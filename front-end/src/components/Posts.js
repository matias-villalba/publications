import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";
import Moment from 'react-moment';
import {ITEMS_PER_PAGE, DEFAULT_NEWEST_FIRST} from '../constants/configs'
import 'moment-timezone';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});


export class Post extends Component {

  state = {
    expanded: null,
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  componentDidMount() {
    this.props.getData({itemsPerPage: ITEMS_PER_PAGE, newestFirst:DEFAULT_NEWEST_FIRST});
  }
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        {this.props.publications.map((publication, index) => (
        <ExpansionPanel key={publication.id} expanded={expanded === ('panel'+(index+1))} onChange={this.handleChange(('panel'+(index+1)))}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{publication.title}</Typography>
          <Typography className={classes.secondaryHeading}>by {publication.author.firstName} {publication.author.lastName}
            <br/>
            <Moment format="dddd, MMMM Do YYYY">{publication.publicationDatetime}</Moment>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
              {publication.body}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    publications: state.remotePublications
  };
}
export default withStyles(styles)(
connect(
  mapStateToProps,
  { getData } //TODO usar/definir el mapDispatchToProps
)(Post))
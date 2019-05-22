import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions/index";
import Moment from 'react-moment';
import {ITEMS_PER_PAGE, DEFAULT_NEWEST_FIRST} from '../constants/configs'
import 'moment-timezone';

export class Post extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getData({itemsPerPage: ITEMS_PER_PAGE, newestFirst:DEFAULT_NEWEST_FIRST});
  }
  render() {
    return (
      <ul className="list-group list-group-flush">
        {this.props.publications.map(publication => (
          <li className="list-group-item" key={publication.id}>
            {publication.title}
            {publication.publicationDatetime}
            <Moment format="dddd, MMMM Do YYYY">{publication.publicationDatetime}</Moment>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    publications: state.remotePublications
  };
}
export default connect(
  mapStateToProps,
  { getData }
)(Post);
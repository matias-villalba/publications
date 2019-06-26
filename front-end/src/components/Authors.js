import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthors } from '../actions/index'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import AuthorButton from './AuthorButton'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

export class Authors extends Component {
  constructor () {
    super()
  }
  componentDidMount () {
    this.props.getAuthors()
  }
  render () {
    const { classes } = this.props
    return (
      <List component='nav' style={{ maxHeight: '825px', overflow: 'scroll' }} >
        {this.props.authors.map(author => (
          <AuthorButton key={author.id} id={author.id} firstName={author.firstName} lastName={author.lastName} email={author.email} birthdate={author.birthdate} />
        ))}
      </List>

    )
  }
}

/*
            {author.firstName}
             {author.lastName}
             {author.email}

             <Moment format="dddd, MMMM Do YYYY">{author.birthdate}</Moment>
             */

function mapStateToProps (state) {
  return {
    authors: state.authors
  }
}

export default withStyles(styles)(connect(
  mapStateToProps,
  { getAuthors }
)(Authors))

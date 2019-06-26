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
  componentDidMount () {
    this.props.getAuthors()
  }
  render () {
    return (
      <List component='nav' style={{ maxHeight: '825px', overflow: 'scroll' }} >
        {this.props.authors.map(author => (
          <AuthorButton key={author.id} id={author.id} firstName={author.firstName} lastName={author.lastName} email={author.email} birthdate={author.birthdate} />
        ))}
      </List>

    )
  }
}

function mapStateToProps (state) {
  return {
    authors: state.authors
  }
}

export default withStyles(styles)(connect(
  mapStateToProps,
  { getAuthors }
)(Authors))

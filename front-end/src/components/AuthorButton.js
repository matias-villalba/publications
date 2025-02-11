import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putAuthorData } from '../actions/index'
import 'moment-timezone'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

export class AuthorButton extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const firstName = this.props.firstName
    const lastName = this.props.lastName
    const email = this.props.email
    const id = this.props.id
    const birthdate = this.props.birthdate

    this.props.putAuthorData({
      id,
      firstName,
      lastName,
      email,
      birthdate
    })
  }

  render () {
    return (
      <ListItem button key={this.props.id} >
        <ListItemText onClick={this.handleClick} primary={this.props.firstName.concat(' ').concat(this.props.lastName)} secondary={this.props.email} />
        <Divider />
      </ListItem>

    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    putAuthorData: author => dispatch(putAuthorData(author))
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(AuthorButton))

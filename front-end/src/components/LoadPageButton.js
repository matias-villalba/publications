import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({
  positionButton: {
    display: 'flex',
    'justify-content': 'center',
    'margin-left': 'auto',
    'margin-top': '10px'
  }
})

class LoadPageButton extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    this.props.load()
  }
  render () {
    const { classes } = this.props
    return (
      <Button className={classes.positionButton} variant='contained' color='primary' onClick={this.handleClick}>
        {this.props.label}
      </Button>
    )
  }
}

export default withStyles(style)(LoadPageButton)

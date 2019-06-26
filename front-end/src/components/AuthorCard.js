import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearAuthorCard } from '../actions/index'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment'
import 'moment-timezone'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

class AuthorCard extends Component {
  constructor () {
    super()
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear () {
    this.props.clearAuthorCard()
  }

  render () {
    const { classes } = this.props
    const bull = <span className={classes.bullet}>•</span>

    return (this.props.currentAuthor && this.props.currentAuthor.id) ? (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
          Author
          </Typography>
          <Typography variant='h5' component='h2'>
            { this.props.currentAuthor.firstName.concat(' ').concat(this.props.currentAuthor.lastName)}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {this.props.currentAuthor.email}
          </Typography>
          <Typography component='p'>
            Birthdate:
            <br />
            <Moment format='dddd, MMMM Do YYYY'>{this.props.currentAuthor.birthdate}</Moment>

          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.handleClear}size='small'>Clear Author filter</Button>
        </CardActions>
      </Card>
    ) : ''
  }
}
function mapStateToProps (state) {
  return {
    currentAuthor: state.currentAuthor
  }
}

function mapDispatchToProps (dispatch) {
  return {
    clearAuthorCard: () => dispatch(clearAuthorCard())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps
)(AuthorCard))

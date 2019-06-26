import React from 'react'

import Publications from './Publications'
import Authors from './Authors'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
})

const App = (props) => {
  const { classes } = props
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='subtitle1' gutterBottom>
              Publications App
            </Typography>
          </Paper>

        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <h2>Authors</h2>
            <Authors />
          </Paper>

        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <h2>Publications</h2>
          </Paper>

          <Publications />

        </Grid>
      </Grid>

    </div>
  )
}
export default withStyles(styles)(App)

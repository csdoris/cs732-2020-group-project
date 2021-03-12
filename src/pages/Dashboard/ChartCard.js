import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import BarChart from './BarChart';
import LineChart from './LineChart';
import SimpleMap from './SimpleMap';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ChartCard extends Component {
  render() {
    const { classes, type } = this.props;

    if (type === 'line') {
      return (
        <Paper className={classes.paper}>
          <LineChart />
        </Paper>
      );
    } else if (type === 'bar') {
      return(
        <Paper className={classes.paper}>
          <BarChart />
        </Paper>
      );
    } else {
      return (
        <Paper className={classes.paper}>
          <SimpleMap />
        </Paper>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(ChartCard);
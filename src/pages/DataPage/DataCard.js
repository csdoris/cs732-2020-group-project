import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import NumberFormat from 'react-number-format';

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

function mapStateToProps(state) {
  return {
    lastUpdateDate: state.data.lastUpdateDate,
    data: state.data.items,
    countries: state.data.countries,
    worldCumConfirmed: state.data.worldCumConfirmed,
    worldCumDeaths: state.data.worldCumDeaths,
    worldCumRecovery: state.data.worldCumRecovery,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
  }
}

class DataCard extends Component {
  render () {
    const { classes, title, type, countries, loading, error, selectedCountry, lastUpdateDate } = this.props;

    if (type === 'lastUpdate' && lastUpdateDate !== '') {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h5">{lastUpdateDate}</Typography>
          </Paper>
        )
    } else if (countries.length > 0) {
      if (selectedCountry==='') {
        const worldType = 'worldC' + type.slice(1);
        return (
          <Paper className={classes.paper}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h4">{(this.props[worldType] > 0) ? <NumberFormat value={this.props[worldType]} displayType={'text'} thousandSeparator={true} /> : 'N/A'}</Typography>
          </Paper>
        )
      } else {
        const thisCountry = countries.find(e => e.country === selectedCountry);
        const number = thisCountry[type];
        return (
          <Paper className={classes.paper}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h4">{(number >= 0 && number !== '') ? <NumberFormat value={number} displayType={'text'} thousandSeparator={true} /> : 'N/A'}</Typography>
          </Paper>
        )
      }
    } else if (error || loading) {
      return (
        <div></div>
      )
    } else {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h4">N/A</Typography>
        </Paper>
      )
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(DataCard));

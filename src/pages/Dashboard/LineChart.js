import React, { Component } from 'react';

import { connect } from 'react-redux';

import Plot from 'react-plotly.js';

function mapStateToProps(state) {
  return {
    data: state.data.items,
    worldConfirmed: state.data.worldConfirmed,
    worldDeaths: state.data.worldDeaths,
    worldRecovery: state.data.worldRecovery,
    selectedCountry: state.data.selectedCountry,
  }
}

class LineChart extends Component {
  render() {
    const { data, worldConfirmed, worldDeaths, worldRecovery, selectedCountry } = this.props;

    
    if (data.length < 0) {
      return (
        <div>Sorry, historical data is temporarily unavailable. Please try again later.</div>
      )

    } else {
      var xConfirmed = [];
      var yConfirmed = [];
      var xDeaths = [];
      var yDeaths = [];
      var xRecovery = [];
      var yRecovery = [];

      if (selectedCountry === '') {
        for (let i in worldConfirmed) {
          xConfirmed.push(worldConfirmed[i].day);
          yConfirmed.push(worldConfirmed[i].num);
        }
        for (let i in worldDeaths) {
          xDeaths.push(worldDeaths[i].day);
          yDeaths.push(worldDeaths[i].num);
        }
        for (let i in worldRecovery) {
          xRecovery.push(worldRecovery[i].day);
          yRecovery.push(worldRecovery[i].num);
        }  
      } else {
        const countryData = data.filter(a => a.country === selectedCountry);
        for (let i in countryData) {
          xConfirmed.push(countryData[i].day);
          yConfirmed.push(countryData[i].cumConfirmed);
          xDeaths.push(countryData[i].day);
          yDeaths.push(countryData[i].cumDeaths);
          xRecovery.push(countryData[i].day);
          yRecovery.push(countryData[i].cumRecovery);
        }
      }

      return (
        <Plot
          data={[
            {
              x: xConfirmed,
              y: yConfirmed,
              name: 'Cases',
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: '#FACD3D' },
            },
            {
              x: xDeaths,
              y: yDeaths,
              name: 'Deaths',
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: '#2CCCC3' },
            },
            {
              x: xRecovery,
              y: yRecovery,
              name: 'Recovery',
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: '#5626C4' },
            },
          ]}
          layout={{ width: 700, height: 320, title: 'Cumulative no. of cases' }}
       />
      )
    }
  }
}

export default connect(mapStateToProps)(LineChart);

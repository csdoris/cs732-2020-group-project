import React, { Component } from 'react';

import { connect } from 'react-redux';

import Plot from 'react-plotly.js';

function mapStateToProps(state) {
  return {
    data: state.data.items,
    worldDayConfirmed: state.data.worldDayConfirmed,
    worldDayDeaths: state.data.worldDayDeaths,
    worldDayRecovery: state.data.worldDayRecovery,
    selectedCountry: state.data.selectedCountry,
  }
}

class BarChart extends Component {
  render() {
    const { data, worldDayConfirmed, worldDayDeaths, worldDayRecovery, selectedCountry } = this.props;

    
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
        for (let i in worldDayConfirmed) {
          xConfirmed.push(worldDayConfirmed[i].day);
          yConfirmed.push(worldDayConfirmed[i].num);
        }
        for (let i in worldDayDeaths) {
          xDeaths.push(worldDayDeaths[i].day);
          yDeaths.push(worldDayDeaths[i].num);
        }
        for (let i in worldDayRecovery) {
          xRecovery.push(worldDayRecovery[i].day);
          yRecovery.push(worldDayRecovery[i].num);
        }  
      } else {
        const countryData = data.filter(a => a.country === selectedCountry);
        for (let i in countryData) {
          xConfirmed.push(countryData[i].day);
          yConfirmed.push(countryData[i].confirmed);
          xDeaths.push(countryData[i].day);
          yDeaths.push(countryData[i].deaths);
          xRecovery.push(countryData[i].day);
          yRecovery.push(countryData[i].recovery);
        }
      }

      return (
        <Plot
          data={[
            {
              x: xConfirmed,
              y: yConfirmed,
              name: 'Cases',
              type: 'bar',
              marker: { color: '#FACD3D' },
            },
            {
              x: xDeaths,
              y: yDeaths,
              name: 'Deaths',
              type: 'bar',
              marker: { color: '#2CCCC3' },
            },
            {
              x: xRecovery,
              y: yRecovery,
              name: 'Recovery',
              type: 'bar',
              marker: { color: '#5626C4' },
            },
          ]}
          layout={{ width: 700, height: 320, title: 'Daily no. of cases' }}
       />
      )
    }
  }
}

export default connect(mapStateToProps)(BarChart);

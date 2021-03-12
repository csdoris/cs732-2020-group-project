import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCountry, openDrawer, closeDrawer } from '../reducers/dataReducer/dataActions';

import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import CountryWiseApp from './CountryWiseApp';

let items = [];

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function mapStateToProps(state) {
  return {
    data: state.data.items,
    countries: state.data.countries,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
    drawerOpen: state.data.drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCountry, openDrawer, closeDrawer }, dispatch);
}

class SideDrawer extends Component {
  handleChangeCountry = (country) => {
    this.props.changeCountry(country);
  }

  toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    open ? this.props.openDrawer() : this.props.closeDrawer();
  }

  render() {
    const { countries, drawerOpen } = this.props;
      if (countries.length > 0) {
        if (items.length === 0) {
          countries.map((d,i) => items.push({
            country: d.country,
            countryName: d.countryName,
            cumConfirmed: d.cumConfirmed,
          }));
        }
        items.sort((a,b) => (b.cumConfirmed - a.cumConfirmed));
        return (
          <div>
            <Fragment key='drawer'>
              <Drawer anchor='right' open={drawerOpen} onClose={this.toggleDrawer(false)} >
                <div role='presentation'>
                  <CountryWiseApp />
                </div>
              </Drawer>
            </Fragment>
          </div>
        )
      } else {
        return (
          <div></div>
        )
      }
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps,mapDispatchToProps)(SideDrawer)));

import { firebaseData } from '../../firebase';
import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CHANGE_COUNTRY, OPEN_DRAWER, CLOSE_DRAWER, SET_TOOLTIP } from './dataConstants';

import centroids from '../../data/countries.json';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = (newData) => ({
  type: FETCH_DATA_SUCCESS,
  payLoad: {
    lastUpdateDate: newData.lastUpdateDate, // last update date
    items: newData.data, // raw data
    countries: newData.countries, // array for country data
    worldCumConfirmed: newData.worldCumConfirmed, // latest total no. of confirmed globally, integer
    worldConfirmed: newData.worldConfirmed, // array for cum_confirmed
    worldDayConfirmed: newData.worldDayConfirmed, // array for confirmed (daily)
    worldCumDeaths: newData.worldCumDeaths, // latest total no. of deaths globally, integer
    worldDeaths: newData.worldDeaths, // array for cum_deaths
    worldDayDeaths: newData.worldDayDeaths, // array for deaths (daily)
    worldCumRecovery: newData.worldCumRecovery, // latest total no. of recovery globally, integer
    worldRecovery: newData.worldRecovery, // array for cum_recovery
    worldDayRecovery: newData.worldDayRecovery, // array for recovery (daily)
  },
})

export const fetchDataFail = (error) => ({
  type: FETCH_DATA_FAIL,
  payload: {
    error: error,
  },
});

export const fetchData = () => dispatch => {
    dispatch(fetchDataBegin());
    firebaseData.orderByChild('day').on('value', (snapshot) => {
      let items = snapshot.val().reverse();
      let newData = {
        lastUpdateDate: '', // last update date
        data: [], // raw data
        countries: [], // array for country data
        worldCumConfirmed: 0, // latest total no. of confirmed globally, integer
        worldConfirmed: [], // array for cum_confirmed
        worldDayConfirmed: [], // array for confirmed (daily)
        worldCumDeaths: 0, // latest total no. of deaths globally, integer
        worldDeaths: [], // array for cum_deaths
        worldDayDeaths: [], // array for deaths (daily)
        worldCumRecovery: 0, // latest total no. of recovery globally, integer
        worldRecovery: [], // array for cum_recovery
        worldDayRecovery: [], // array for recovery (daily)
      };
      for (let i in items) {
        if (!newData.countries.find(c => c.country === items[i].country)) {
          newData.countries.push({
            country: items[i].country,
            countryName: items[i].country_name,
            cumConfirmed: items[i].cum_confirmed,
            cumDeaths: items[i].cum_deaths,
            cumRecovery: items[i].cum_recovery,
            x: (centroids.filter(a => a.country === items[i].country).length > 0) ? centroids.filter(a => a.country === items[i].country)[0].longitude : "",
            y: (centroids.filter(a => a.country === items[i].country).length > 0) ? centroids.filter(a => a.country === items[i].country)[0].latitude : "",
          });
          newData.worldCumConfirmed = (items[i].cum_confirmed > 0) ? newData.worldCumConfirmed + items[i].cum_confirmed : newData.worldCumConfirmed;
          newData.worldCumDeaths = (items[i].cum_deaths > 0) ? newData.worldCumDeaths + items[i].cum_deaths : newData.worldCumDeaths;
          newData.worldCumRecovery = (items[i].cum_recovery > 0) ? newData.worldCumRecovery + items[i].cum_recovery : newData.worldCumRecovery;
        }
        // Put global daily cummulated confirmed into worldConfirmed array
        if (!newData.worldConfirmed.find(a => a.day === items[i].day)) {
          if (newData.lastUpdateDate==='') {
            newData.lastUpdateDate = items[i].day;
          } else if (Date.parse(items[i].day) > Date.parse(newData.lastUpdateDate)) {
            newData.lastUpdateDate = items[i].day;
          }
          newData.worldConfirmed.push({
            day: items[i].day,
            num: items[i].cum_confirmed,
          });
          } else {
            const objIndex = newData.worldConfirmed.findIndex(obj => obj.day === items[i].day);
            newData.worldConfirmed[objIndex].num += items[i].cum_confirmed;
        }
        // Put global daily confirmed into worldDayConfirmed array
        if (!newData.worldDayConfirmed.find(a => a.day === items[i].day)) {
          newData.worldDayConfirmed.push({
            day: items[i].day,
            num: items[i].confirmed,
          });
          } else {
            const objIndex = newData.worldDayConfirmed.findIndex(obj => obj.day === items[i].day);
            newData.worldDayConfirmed[objIndex].num += items[i].confirmed;
        }
        // Put global daily cummulated deaths into worldDeaths array
        if (!newData.worldDeaths.find(a => a.day === items[i].day)) {
          newData.worldDeaths.push({
            day: items[i].day,
            num: items[i].cum_deaths,
          });
          } else {
            const objIndex = newData.worldDeaths.findIndex(obj => obj.day === items[i].day);
            newData.worldDeaths[objIndex].num += items[i].cum_deaths;
        }
        // Put global daily deaths into worldDayDeaths array
        if (!newData.worldDayDeaths.find(a => a.day === items[i].day)) {
          newData.worldDayDeaths.push({
            day: items[i].day,
            num: items[i].deaths,
          });
          } else {
            const objIndex = newData.worldDayDeaths.findIndex(obj => obj.day === items[i].day);
            newData.worldDayDeaths[objIndex].num += items[i].deaths;
        }
        // Put global daily cummulated recovery into worldRecovery array
        if (!newData.worldRecovery.find(a => a.day === items[i].day)) {
          newData.worldRecovery.push({
            day: items[i].day,
            num: items[i].cum_recovery,
          });
          } else {
            const objIndex = newData.worldRecovery.findIndex(obj => obj.day === items[i].day);
            newData.worldRecovery[objIndex].num += items[i].cum_recovery;
        }
        // Put global daily recovery into worldDayRecovery array
        if (!newData.worldDayRecovery.find(a => a.day === items[i].day)) {
          newData.worldDayRecovery.push({
            day: items[i].day,
            num: items[i].recovery,
          });
          } else {
            const objIndex = newData.worldDayRecovery.findIndex(obj => obj.day === items[i].day);
            newData.worldDayRecovery[objIndex].num += items[i].recovery;
        }
        newData.data.push({
          id: i,
          country: items[i].country,
          countryName: items[i].country_name,
          day: items[i].day,
          confirmed: items[i].confirmed,
          cumConfirmed: items[i].cum_confirmed,
          deaths: items[i].deaths,
          cumDeaths: items[i].cum_deaths,
          recovery: items[i].recovery,
          cumRecovery: items[i].cum_recovery,
        });
      }
      dispatch(fetchDataSuccess(newData));
    }, (error) => {
      dispatch(fetchDataFail(error));
    })
}

export const changeCountry = (country) => ({
  type: CHANGE_COUNTRY,
  payLoad: {
    selectedCountry: country,
  },
})

export const openDrawer = () => ({
  type: OPEN_DRAWER,
})

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
})

export const setTooltip = (content) => ({
  type: SET_TOOLTIP,
  payLoad: {
    tooltip: content,
  },
})

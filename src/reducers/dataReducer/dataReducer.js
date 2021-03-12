import { createReducer } from '../reducerUtils';
import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CHANGE_COUNTRY, OPEN_DRAWER, CLOSE_DRAWER, SET_TOOLTIP } from './dataConstants';

const initialState = {
  /* For data loading */
  loading: false,
  error: null,
  /* Data to be used */
  lastUpdateDate: '', // last update date
  items: [], // raw data
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
  /* For UI */
  selectedCountry: '', // selected country
  drawerOpen: false,
  tooltip: [],
};

const fetchDataBegin = (state) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

const fetchDataSuccess = (state, payLoad) => {
  return {
    ...state,
    lastUpdateDate: payLoad.lastUpdateDate,
    items: payLoad.items,
    countries: payLoad.countries,
    worldCumConfirmed: payLoad.worldCumConfirmed,
    worldConfirmed: payLoad.worldConfirmed,
    worldDayConfirmed: payLoad.worldDayConfirmed,
    worldCumDeaths: payLoad.worldCumDeaths,
    worldDeaths: payLoad.worldDeaths,
    worldDayDeaths: payLoad.worldDayDeaths,
    worldCumRecovery: payLoad.worldCumRecovery,
    worldRecovery: payLoad.worldRecovery,
    worldDayRecovery: payLoad.worldDayRecovery,
    loading: false,
  };
}

const fetchDataFail = (state, payLoad) => {
  return {
    ...state,
    items: [],
    loading: false,
    error: payLoad.error,
  };
}

const changeCountry = (state, payLoad) => {
  return {
    ...state,
    selectedCountry: payLoad.selectedCountry,
  }
}

const openDrawer = (state) => {
  return {
    ...state,
    drawerOpen: true,
  }
}

const closeDrawer = (state) => {
  return {
    ...state,
    drawerOpen: false,
  }
}

const setTooltip = (state, payLoad) => {
  return {
    ...state,
    tooltip: payLoad.tooltip,
  }
}

export default createReducer(initialState, {
  [FETCH_DATA_BEGIN]: fetchDataBegin,
  [FETCH_DATA_SUCCESS]: fetchDataSuccess,
  [FETCH_DATA_FAIL]: fetchDataFail,
  [CHANGE_COUNTRY]: changeCountry,
  [OPEN_DRAWER]: openDrawer,
  [CLOSE_DRAWER]: closeDrawer,
  [SET_TOOLTIP]: setTooltip,
});

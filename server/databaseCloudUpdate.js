const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const jsonData = 'https://pomber.github.io/covid19/timeseries.json';
const fetch = require("node-fetch");
let fs = require('fs');
let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require('firebase/database');
let ourJson = [];

let config = {
    headers:{
        "Content-Type":"application/json"
    },
    method:"GET",
};

let databaseConfig = {
    apiKey: "-----removed-----",
    authDomain: "lavender-lizard.firebaseapp.com",
    databaseURL: "https://lavender-lizard.firebaseio.com",
    projectId: "lavender-lizard",
    storageBucket: "lavender-lizard.appspot.com"
};
firebase.initializeApp(databaseConfig);
function writeData() {
    firebase.database().ref('root/').set({
        ourJson
    })
}

exports.updateDatabase = functions.pubsub.schedule('every day 00:00').onRun(async context => {
    fetch(jsonData, config)
        .then(res => res.json())
        .then(json => {
            for (const key in json) {
                if (json.hasOwnProperty(key)) {
                    let countryArray = json[key];
                    for (const dataPoint of countryArray) {
                        let newTimeSeries = {};
                        newTimeSeries['country_name'] = key;
                        newTimeSeries['day'] = dataPoint['date'];
                        newTimeSeries['cum_confirmed'] = dataPoint['confirmed'];
                        newTimeSeries['cum_deaths'] = dataPoint['deaths'];
                        newTimeSeries['cum_recovery'] = dataPoint['recovered'];
                        ourJson.push(newTimeSeries);
                    }
                    for(let i = countryArray.length - 1; i > 0; i--) {
                        countryArray[i]['confirmed'] = countryArray[i]['confirmed'] - countryArray[i - 1]['confirmed'];
                        countryArray[i]['deaths'] = countryArray[i]['deaths'] - countryArray[i - 1]['deaths'];
                        countryArray[i]['recovered'] = countryArray[i]['recovered'] - countryArray[i - 1]['recovered'];
                    }
                    for (const dataPoint of countryArray) {
                        for(const dataPointJson of ourJson) {
                            if(dataPoint['date'] === dataPointJson['day'] && key === dataPointJson['country_name']) {
                                dataPointJson['confirmed'] = dataPoint['confirmed'];
                                dataPointJson['deaths'] = dataPoint['deaths'];
                                dataPointJson['recovery'] = dataPoint['recovered'];
                            }
                        }
                    }
                }
            }

            for (const jsonDataPoint of ourJson) {
                let dateFormat = new Date(jsonDataPoint['day']);
                let year = dateFormat.getFullYear();
                let month = (dateFormat.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                let day = dateFormat.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
                jsonDataPoint['day'] = year + "-" + month + "-" + day;
            }

            fs.readFile('./countryCodes.json', 'utf8', (err, jsonString) => {
                if (err) {
                    console.log("Error reading file:", err);
                    return
                }
                try {
                    const countryCodes = JSON.parse(jsonString);
                    for(const jsonDataPoint of ourJson) {
                        for (const countryCode of countryCodes) {
                            if(jsonDataPoint['country_name'] === countryCode['Country']) {
                                jsonDataPoint['country'] = countryCode['Code'];
                            }
                        }
                    }
                    writeData();
                    console.log("Saved!");
                } catch(err) {
                    console.log('Error parsing JSON string:', err)
                }
            });
        });
});

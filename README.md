# COVID-19 Dashboard

## Overview of the Project
This is a full-stack web application that processes, analyses and visualises data and statistics related to the coronavirus.
![Screenshot 1](/screenshots/screenshot1.jpg?raw=true "Screenshot 1")

## Quick start guide
The dashboard is available online at: https://lavender-lizard-dashboard.web.app/  
It is up and running 24/7 for you to use without any installation.

If you prefer to run the app locally, installation of the dashboard is also quick and easy. All you need to do is to install some dependencies, and you are good to go. You can use either npm or yarn to do that.

### Install the dependencies
Using npm:
```
npm install
```
Using yarn:
```
yarn install
```

### Run the dashboard
Using npm:
```
npm start
```
Using yarn:
```
yarn start
```

The dashboard will now run in your default browser at: http://localhost:3000/

## Website Features
To track and analyse the spread of the coronavirus and allow you to compare the incremental patterns in different countries, a huge set of data is retrieved from https://pomber.github.io/covid19/timeseries.json and consolidated in a Firebase database for retrieval.

When the dashboard is first loaded, global figures are shown. You can click on a country on the list or a bubble on the map to select a country, the key figures and graphs will then be updated with country-specific data accordingly.
![Screenshot 2](/screenshots/screenshot2.jpg?raw=true "Screenshot 2")

### Key figures
Global numbers of cases, deaths and recovery are shown immediately for user's easy reference. When you click on the list of countries or the bubbles on the map, the figures will be updated to show the selected country's numbers of cases, deaths and recovery.

### List of countries ranked by number of cases
A list of countries with total number of cases is shown on the left-hand side of the dashboard. You can see which countries are having the highest number of cases and their corresonding numbers instantly. You can go through the list by clicking on the left or right arrows easily, and click on a country to update the whole dashboard for details.

### World Map
In the middle of the dashboard, a world map with bubbles provides a visualised way for you to interpret the data. You can move your mouse pointer on top of the bubbles to see the country and its number of cases, and click on the bubble to update the whole dashboard for details. You can also zoom in by double-click, zoom out by moving your fingers apart, and pan by dragging on the map for easy navigation.

### Graphs
A line graph and a bar chart showing the cumulative and daily figures respectively. The graphs visualise the data and allow you to better compare the situations between countries. Both charts are interactive and support zooming in and out so you can hold your mouse to highlight a particular timeframe to focus on.

### Country-wise live tracker
In addition to the dashboard, a country-wise live tracker is available for you to have a handy quick glance of the situation of a particular country by typing in the first few letters of the country name. The data is retrieve from https://corona.lmao.ninja/v2/all and https://corona.lmao.ninja/v2/countries.

## Tools used in this project

### React
All of us were new to React at the beginning of the course. We used Andrew's lectures as a starting point to learn React and started with creating our very first components. As our application requires retrieval of data, we use Redux and Thunk to set states and dispatch actions once the asynchronous JSON fetches are completed.

We then went further to investigate other packages that can facilitate our implementation of this project. For example, we use Material-UI to handle the presentation of data and style our components so that they all have a consistent look-and-feel. We use Plotly.js to draw charts of time-series data and React Simple Maps to render our bubble map with tooltip. We also use Axios to handle our asynchronous JSON requests.

### React Testcases
In the syllabus, we have been introduced to the testing of applications using React JS. As we all know, there are two methods of testing, namely manual or automated. Manual testing includes the unit testing that we have performed while we develop the application. In this phase, we went through the various steps of unit testing. Example of unit testing can be found in our application where at multiple places we have commented some lines where we had outputted some test outputs using 'console.log()'. Accordingly, it can be seen throughout the application.

For automated testing, we have used Resct Js to run some scripts and test some of the modules of our application. For example, we have carried out API testing which can be seen in the 'src' folder and which naviagtes to the '_tests_' folder. In this folder, we have arranged various test case files in the application. For testing the API we have a file named Api.test.js where we fetched the data from the API and tested the result using normal test case. Similarly, all the componenets of our application are tested in the normal react test cases. For simulation of the features in components, we have used 'Enzyme' to simulate operations. To use enzyme, you need to install a package using the following command.

Using npm:
```
npm install --save-dev enzyme enzyme-adapter-react-16 jest-enzyme
```
Using yarn:
```
yarn add enzyme enzyme-adapter-react-16 jest-enzyme
```
Overall we have 3 test suits and comprising of 5 tests.


### GitHub
GitHub has helped us collaborate well. We were able to modify the changes in each other’s code and even comment on
what we understood and what is to be debated over the inclusion and ignorance of a feature. Initially, we had collaborations on our individual repositories, where we used to store our own codes and then another person can clone or download the code and use it. Eventually, we realised that we had to do all this on the group’s repository and then we shifted the codes from our personal repos to the group's one. Commit messages helped us understand what changes were done and when and how by another person in the group.

### Firebase
We use Firebase to host our web application and real-time database. We would like to deploy the dashboard on the Web so that everybody can use it without the hassle of installation. Firebase allows us to publish the front-end app to the whole world in no time. It also comes with a real-time database that fits seamlessly with our need of data storage.

For the database, we created a schema file first and then went on with the changes ahead. We also used APIs to get the data for the live tracker. We searched for many APIs and eventually settled on the ones that can allow us to update our database easily, and to provide a real-time summary in the live tracker. The reason for having our own database is to avoid service interruption. Sometimes the APIs may fail when it has too many calls to handle. In order to provide a smooth user experience, we retrieve the data daily and supply it to the web application from our own database.

## Project Management
For the project management, we used our Group page on Canvas quite often. We created a collaboration document on Canvas named “Project Plan”. It is available at https://canvas.auckland.ac.nz/groups/92031/collaborations. In this document, we scheduled our jobs and roles throughout this project. Along with this, after every meeting we had, we updated this document and maintained the findings that were encountered in every meeting. We also included a final tasks breakdown to each team member in the document.

For the communication, initially we had meetings on campus and discussed some project topics there. During lockdown, we used Zoom to arrange virtual meetings, and more often than not, we used the announcement function in our Canvas page to notify all members about the Zoom meeting details. We also used our Canvas page to exchange files like raw data and JSON schema.

Along with scheduled meetings, many of our discussions took place in a WhatsApp group. Here, we could share some ideas anyone sees. There were numerous links for the reference sites of extra materials to read and several youtube links for the videos relating to coronavirus tracking applications. Everyone involved and contributed to the team whenever needed. Even in the lockdown period, there was a good communication between the team members and it was good that everyone abode with the work assigned.

## Acknowledgement
We would like to thank you [@pomber](https://github.com/pomber/covid19) and https://corona.lmao.ninja/ for providing the APIs that supply historical data of cases (confirmed, deaths and recovery) and real-time summary to our web app respectively.

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Columns from 'react-columns';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function CountryWiseApp() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    axios
      .all([
        axios.get('https://corona.lmao.ninja/v2/all'),
        axios.get('https://corona.lmao.ninja/v2/countries'),
      ])
      .then((resArr) => {
      /*Console.log() commented as it was used only for the unit testing purposes*/
      //console.log(resArr[0].data
        setLatest(resArr[0].data);
        setResults(resArr[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    const filterCountry = results.filter((item) => {
    return searchCountry !== ''
      ? item.country.toUpperCase().includes(searchCountry.toUpperCase())
      : item;
  });

  var queries = [
    {
      columns: 1,
      query: 'min-width:1000px',
    },
  ];

  const countries = filterCountry.map((data, index) => {
    return (
      <Card
        key={index}
        bg="light"
        text="dark"
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases: {parseInt(data.cases).toLocaleString()}</Card.Text>
          <Card.Text>
            Deaths: {parseInt(data.deaths).toLocaleString()}
          </Card.Text>
          <Card.Text>
            Recovered: {parseInt(data.recovered).toLocaleString()}
          </Card.Text>
          <Card.Text>
            Today's Cases: {parseInt(data.todayCases).toLocaleString()}
          </Card.Text>
          <Card.Text>
            Today's Deaths: {parseInt(data.todayDeaths).toLocaleString()}
          </Card.Text>
          <Card.Text>
            Active: {parseInt(data.active).toLocaleString()}
          </Card.Text>
          <Card.Text>
            Critical: {parseInt(data.critical).toLocaleString()}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="app2">
      <br />
      <h2 className="text-center">Country-wise LIVE Tracker</h2>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default CountryWiseApp;

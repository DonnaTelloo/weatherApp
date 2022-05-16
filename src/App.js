import { useEffect, useState } from 'react';
import { Chip, Divider, Grid } from '@mui/material';
import Cookies from 'js-cookie'
import { styled } from '@mui/material/styles';
import BaseWrapper from "./components/layout/baselayout";
import SearchContainer from "./components/search"
import './App.css'
import Fetcher from './lib/fetch';

const LastQueries = styled('div')(() => ({
    width: '100%',
    background: '#dfe6e9',
    padding: 20,
    '& .last-queries-list': {
      width: '100%',
      marginTop: 25,
      display: 'grid',
      '& > ul': {
        margin: 'auto',
        display: 'inline-flex',
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        '& > li': {
          cursor: 'pointer',
          color: '#0984e3',
          marginRight: 12,
        }
      }
    }
}))

const Forecast = styled(Grid)(() => ({
  width: '100%',
  border: '2px solid #e5e5e5',
  borderTop: 0,
  margin: 0,
  padding: 30,
  '& > .MuiGrid-root': {
    height: '50px',
    background: '#dfe6e9',
    borderRadius: '25px',
    position: 'relative',
    padding: '0px',
    paddingLeft: '20px',
    marginBottom: 25,
    '& > img': {
      position: 'absolute',
    top: '-35px',
    right: '-30px',
    },
    '& > p': {
      fontSize: '14px',
    color: '#747474',
    lineHeight: 0,
    marginTop: '5px',
    },
    '& > span': {
      fontSize: '12px',
    color: '#8d8d8d',
    lineHeight: 0,
    }
  }
}))

function App() {

  const [weatherData, setWeatherData] = useState([]);

  const isToday = (weatherDate) => {
    const today = new Date();
    return new Date(weatherDate).getDate() == today.getDate() ? 'Today' : '12'
  }

  const handleSearch = (city) => {
    Fetcher(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=83d2ac82d753b511e5c4adc38c560dc5`).then((data) => {
      let arr = [];
      debugger
      console.log(Cookies.get('lastqueries'))
      if(Cookies.get('lastqueries') !== undefined){
          arr = JSON.parse(Cookies.get('lastqueries'));
      }else{
          arr = [];
      }

      if(arr.length == 10){
        arr.shift();
      }

      arr = arr.filter(item => item !== city)
      arr.push(city);
      Cookies.set('lastqueries', JSON.stringify(arr))

      Fetcher(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&cnt=5&appid=83d2ac82d753b511e5c4adc38c560dc5`).then((data) => {
        setWeatherData(data.list)
      })
    }).catch(err => {
      alert(err);
    })
  }

  useEffect(() => {
    handleSearch('Kyiv')
  }, []);

  return (
    <BaseWrapper>
      <LastQueries>
      <SearchContainer handleChange={(city) => handleSearch(city)}/>
        <Divider>
          <Chip label="Last 10 Queries" />
        </Divider>
        <div className='last-queries-list'>
          <ul>
            { Cookies.get('lastqueries') !== undefined && (
              JSON.parse(Cookies.get('lastqueries')).map(item => {
                return <li>{item}</li>
              })
            ) }
          </ul>
        </div>
      </LastQueries>
      <Forecast item justifyContent='space-between'>
        {weatherData.length > 0 && (
           weatherData.map(item => {
            return (
              <Grid item>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <span>{item.dt_txt.split(" ")[1]}</span>
              <p>{item.weather[0].main} / {item.main.temp}</p>
            </Grid>
            )
          })
        ) }
      </Forecast>
    </BaseWrapper>
  );
}

export default App;

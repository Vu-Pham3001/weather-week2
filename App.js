import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React from 'react';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = React.useState()
  const [temperature, setTemperature] = React.useState()
  const [condition, setCondition] = React.useState()
  const [conditionIcon, setConditionIcon] = React.useState()
  const [maxTemp, setMaxTemp] = React.useState()
  const [minTemp, setMinTemp] = React.useState()
  const [Date, setDate]= React.useState()

  React.useEffect(() => {
    axios.get('https://api.weatherapi.com/v1/forecast.json?key=17bc6b7b0ac14c7aa5361629221404&q=Hanoi&days=1&aqi=no&alerts=no')
      .then(res => {
        return ([
          setDate(res.data.current.is_day),
          setLocation(res.data.location.name),
          setTemperature(res.data.current.temp_c),
          setCondition(res.data.current.condition.text),
          setConditionIcon(res.data.current.condition.icon),
          setMaxTemp(res.data.forecast.forecastday[0].day.maxtemp_c),
          setMinTemp (res.data.forecast.forecastday[0].day.mintemp_c)
        ])
      })
  }, [])
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Text>Pham Truong Vu</Text>
    //   <StatusBar style="auto" />
    // </View>
    <ImageBackground source={require('./assets/chua-mot-cot-anh-1.jpg')} style={styles.container}>
      <Text style={styles.title}>{location}</Text>
      <Image style={styles.conditionIcon} source={{ uri: (conditionIcon) ? `https:${conditionIcon}` : `https://cdn.weatherapi.com/weather/64x64/day/122.png` }} />
      <View style={styles.weather}>
        <Text style={styles.temperature}>
          <Text >{temperature} °C</Text>
        </Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>

      <View style={styles.forecast}>
        <Text style={styles.avgtemp}>{maxTemp} °C / {minTemp} °C   Chủ Nhật</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: '25px',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 50
  },

  conditionIcon: {
    width: 200,
    height: 200,
  },

  temperature: {
    fontSize: '25px',
    color: '#fff',
  },

  condition: {
    fontSize: '30px',
    position: 'absolute',
    right: 0,
    color: '#fff'
  },

  weather: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginRight: '100px',
  },

  forecast: {
    width: '100%',
  },

  avgtemp: {
    color: '#00aa00',
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '20px'
  }
});

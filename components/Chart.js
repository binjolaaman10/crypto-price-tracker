import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';

// import { priceConversion } from '../services/priceConversion';

export const { width: SIZE } = Dimensions.get('window');

const Chart = (prop) => {
  /* Currently not working */
  // const [RATE, setRate] = useState([]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const rate = await priceConversion();
  //     setRate(rate);
  //     console.log(rate.data.INR);
  //   }

  //   fetchData();
  // }, [])

  const formatINR = value => {
    'worklet';
    let x = prop.currentPrice.toFixed(2);
    if (value === '') {
      return `₹${x.toString().split('.')[0].length > 3 ? x.toString().substring(0, x.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length - 3) : x.toString()}`;
    }
    let t = value.toString().split('.')[0].length > 3 ? value.toString().substring(0, value.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + value.toString().substring(value.toString().split('.')[0].length - 3) : value.toString();
    x = parseFloat(value).toFixed(2);
    return `$${(x).toString().split('.')[0].length > 3 ? x.toString().substring(0, x.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length - 3) : x.toString()}`;
  };

  return (
    <ChartPathProvider data={{ points: prop.sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.chartWrapper}>
        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image
                source={{ uri: (prop.logoURL) }}
                style={styles.image}
              />
              <Text style={styles.subtitles}>{prop.name} ({(prop.symbol).toUpperCase()})</Text>
            </View>
            <Text style={styles.subtitles}>7d</Text>
          </View>

          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatINR}
              style={[styles.boldTitle, { color: 'black' }]}
            />
            <Text style={[styles.title, {
              color: prop.priceChangePercentage >= 0 ? 'green' : 'red'
            }]}>{(prop.priceChangePercentage).toFixed(2)}%</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 1.5} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
        </View>
      </View>
    </ChartPathProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
    marginRight: 5
  },
  subtitles: {
    color: 'gray'
  },

  chartWrapper: {
    marginVertical: 16
  },

  titlesWrapper: {
    marginHorizontal: 15,
  },


  chartLineWrapper: {
    marginTop: 40,
  },

  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  upperLeftTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },

  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 18
  },

});

export default Chart;
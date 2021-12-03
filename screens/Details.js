import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from "react-native-feather";
import Chart from '../components/Chart';

function Details({ route, navigation }) {
  const { item } = route.params;
  // console.log(item.name)

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 15 }}>

      {/* Header */}
      <View style={styles.header}>

        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft stroke="#000" width={25} height={25} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>{item.name}</Text>
        </View>

      </View>

      {/* Chart */}
      <View style={styles.chart}>
        {item ?
          <Chart
            currentPrice={item.current_price}
            logoURL={item.image}
            name={item.name}
            priceChangePercentage={item.price_change_percentage_7d_in_currency}
            sparkline={item.sparkline_in_7d.price}
            symbol={item.symbol}
          />
          : null
        }
      </View>

      <StatusBar style="light" translucent={false} />

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },

  headerText: {
    flex: 1,
    alignItems: 'center',
  },

  chart: {
    marginTop: 25,
  },

});

export default Details;
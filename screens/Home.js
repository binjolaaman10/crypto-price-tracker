import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import ListItem from '../components/ListItem';
import { marketData } from '../services/cryptoServices';

function Home({ navigation }) {
  const [DATA, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const prices = await marketData();
      setData(prices); 
    }

    fetchData();
  }, [])


  // GETTING LATEST VALUE OF COINS
  // const [selectedCoinData, setSelectedCoinData] = useState(null);

  // useEffect(() => {
  //   selectedCoinData === hello;
  // }, [selectedCoinData]); 


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { item: item })}
      >
        <View
          style={{
            marginTop: item.id === 'bitcoin' ? 0 : 24,
          }}
        >
          <ListItem
            name={item.name}
            currentPrice={item.current_price}
            priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
            symbol={item.symbol}
            logoURL={item.image}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const header = () => {
    return (
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>
          Market Prices
        </Text>
        <View style={styles.underline}></View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={DATA}
        renderItem={renderItem}
        ListHeaderComponent={header}
      />
      <StatusBar style="light" translucent={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerWrapper: {
    paddingTop: 25,
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  underline: {
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
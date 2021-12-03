import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function ListItem({ name, symbol, currentPrice, priceChangePercentage7d, logoURL }) {
  function numberWithCommas(x) {
    return x.toString().split('.')[0].length > 3 ? x.toString().substring(0, x.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x.toString().substring(x.toString().split('.')[0].length - 3) : x.toString();
  }

  return (
    
      <View style={styles.itemWrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Image
            source={{ uri: logoURL }}
            style={styles.image}
          />

          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>


        <View style={styles.rightSideWrapper}>
          <Text style={styles.title}>
            ₹{numberWithCommas(currentPrice.toFixed(2))}
          </Text>
          <Text style={[styles.subtitle, {
            color: priceChangePercentage7d >= 0 ? 'green' : 'red'
          }]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  titlesWrapper: {
    paddingHorizontal: 10
  },

  title: {
    fontSize: 18,
    color: '#000',
  },

  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },

  image: {
    width: 48,
    height: 48,
    resizeMode: 'center',
  },

  rightSideWrapper: {
    alignItems: 'flex-end',
  },
});

export default ListItem;
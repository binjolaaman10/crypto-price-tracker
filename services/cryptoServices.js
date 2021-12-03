import moment from 'moment';
import axios from 'axios';

/* 
https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d
*/

const formatSparkline = (numbers) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
        return {
            x: sevenDaysAgo + (index + 1) * 3600,
            y: item,
        }
    });

    return formattedSparkline;
}

const formatMarketData = (data) => {
    let formattedData = [];

    data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }

        formattedData.push(formattedItem);
    });

    return formattedData;
}

export const marketData = async () => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d';
        const response = await axios.get(url);
        const data = response.data;
        const formattedData = formatMarketData(data);
        return formattedData;
    } catch (error) {
        console.log(error.message);
    }
}
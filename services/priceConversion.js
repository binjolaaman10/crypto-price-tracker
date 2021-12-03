import axios from 'axios';

/* 
https://freecurrencyapi.net/api/v2/latest?apikey=9b268820-5432-11ec-8c1b-b3aec53faae1
*/


export const priceConversion = async () => {
    try {
        const url = 'https://freecurrencyapi.net/api/v2/latest?apikey=9b268820-5432-11ec-8c1b-b3aec53faae1';
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
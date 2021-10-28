import axios from "axios";

export default function callapi(method, endpoint, data) {
    return axios({
        method,
        url: `https://bing-news-search1.p.rapidapi.com/${endpoint}`,
        data,
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            'x-rapidapi-key': '1d0c8d8b31mshde94786a0d49703p1e9aecjsn8675a13ad686'
          }
    })
}
const API_DOMAIN = "https://newsapi.org/v2/top-headlines?";
const API_SEARCH_DOMAIN = "https://newsapi.org/v2/everything?";
const API_KEY = "e08c43148a5746c9816c11992540cce3";

export const endpointPath = (country, category) =>
  `${API_DOMAIN}country=${country}&category=${category}&apiKey=${API_KEY}`; //&pageSize=99

export const endpointSearch = (searchQuery, fromDate, toDate) =>
  `${API_SEARCH_DOMAIN}q=${searchQuery}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=${API_KEY}`; //&pageSize=99

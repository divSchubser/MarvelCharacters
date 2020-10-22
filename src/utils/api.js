export async function SearchWoeid(city) {
  const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0].woeid;
}
export async function SearchWeather(woeid) {
  const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getWeather(input) {
  const woeid = await SearchWoeid(input);
  const weatherObj = await SearchWeather(woeid);
  return weatherObj;
}

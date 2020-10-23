export async function SearchWeather(city) {
  const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  //   return data[0].woeid;
  // }
  // export async function SearchWeather(woeid) {
  const url2 = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${data[0].woeid}`;
  const response2 = await fetch(url2);
  const data2 = await response2.json();
  return data2;
}

// export async function getWeather(input) {
//   // const woeid = await SearchWoeid(input);
//   // const weatherObj = await SearchWeather(woeid);
//   const weatherObj = await SearchWeather(input);
//   return weatherObj;
// }

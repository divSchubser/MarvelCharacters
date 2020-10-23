export async function SearchWeather(city) {
  const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log("data:", data);

  if (data.length === 0) {
    const data3 = {
      consolidated_weather: [
        {
          the_temp: 404,
          weather_state_name: "404 Weather not Found",
          weather_state_abbr: "t",
        },
      ],
      title: "404 City not Found",
    };

    console.log("data3:", data3);

    return data3;
  } else {
    const url2 = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${data[0].woeid}`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    console.log("data2:", data2);

    return data2;
  }
}

// export async function getWeather(input) {
//   // const woeid = await SearchWoeid(input);
//   // const weatherObj = await SearchWeather(woeid);
//   const weatherObj = await SearchWeather(input);
//   return weatherObj;
// }

export async function GetRandomQuote() {
  const url = `https://api.adviceslip.com/advice`;
  const response = await fetch(url);
  const data = await response.json();
  return data.slip.advice;
}

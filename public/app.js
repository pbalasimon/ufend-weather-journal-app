/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const apiKey = "&APPID=97153a726060df6ae79bd4f707d5230e";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const getWeather = async (url = "") => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addWeather = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
};

const updateUI = async () => {
  const projectData = await getWeather("weather");
  document.querySelector("#date").innerHTML = `${projectData.date}`;
  document.querySelector(
    "#temp"
  ).innerHTML = `${projectData.temperature} &#8457`;
  document.querySelector("#content").innerHTML = projectData.feelings;
  document.querySelector("#city").innerHTML = document.querySelector(
    "#zip"
  ).value;
};

const getOpenWeather = async () => {
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  const response = await fetch(`${url}${zip}${apiKey}`);
  try {
    const data = await response.json();
    data.feelings = feelings;
    data.date = newDate;
    await addWeather("weather", data);
    updateUI();
  } catch (error) {
    console.error("error", error);
  }
};

document.getElementById("generate").addEventListener("click", getOpenWeather);

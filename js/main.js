let respose;
let timeCurrent;
let req;
let arrayDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedensday",
  "Thursday",
  "Friday",
  "Saturday",
];
let arrayMonthes = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November ",
  "December",
];
let locationName;
let statusWeather;
let urlStatusWeatherIcon;
let temp_c;
let currentDay;
let nameoneDay;
let oneDay;
let nameSecondDay;
let secondeDay;
let inputdat = document.querySelector(".home input");
async function getResponse(){
   req=await fetch('http://api.weatherapi.com/v1/forecast.json?key=f9700c1d85f64f39b4133455242006 &q=cairo&days=3');
   respose =await req.json();
return respose;
}
inputdat.addEventListener("input",async function () {
  let country = inputdat.value;
  req=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f9700c1d85f64f39b4133455242006 &q=${country}&days=3`);
   respose =await req.json();
    timeCurrent = respose.location.localtime.split(" ")[0];
    locationName = respose.location.name;
    statusWeather = respose.current.condition.text;
    urlStatusWeatherIcon = respose.current.condition.icon;
    temp_c = respose.current.temp_c;
    currentDay = new Date(timeCurrent);
    //===========
    nameoneDay = respose.forecast.forecastday[1].date;
    oneDay = new Date(nameoneDay);
    //==============
    nameSecondDay = respose.forecast.forecastday[2].date;
    secondeDay = new Date(nameSecondDay);
    DisplayThreeDays();
  // });
});
 async function getdata() {
    let respose= await getResponse();
    timeCurrent = respose.location.localtime.split(" ")[0];
    locationName = respose.location.name;
    statusWeather = respose.current.condition.text;
    urlStatusWeatherIcon = respose.current.condition.icon;
    temp_c = respose.current.temp_c;
    currentDay = new Date(timeCurrent);
    //===========
    nameoneDay = respose.forecast.forecastday[1].date.split("-");
    oneDay = new Date(nameoneDay);
    //==============
    nameSecondDay = respose.forecast.forecastday[2].date;
    secondeDay = new Date(nameSecondDay);
    DisplayThreeDays();
  // });
}
function DisplayThreeDays() {
  let containerDate = "";
  containerDate += `
            <div class="col-lg-4 col-md-6 p-0 ">
            <div class="item  ">
            <div class="head p-2">
                <span>${arrayDays[currentDay.getDay()]}</span>
                <span>${currentDay.getDate()} ${
    arrayMonthes[currentDay.getMonth()]
  }</span>
            </div>
            <div class="body ">
              <span class="d-inline-block text-white text-opacity-75 fw-medium py-4 ps-3" >${locationName}</span>
              <div class="status py-3">
                <h1 class="text-white ps-3">${temp_c}&deg;C</h1>
                <img src="https:${urlStatusWeatherIcon}"  alt="">
              </div>
              <h2 class="h6 text-info py-2 ps-3">${statusWeather}</h2>
              <div class="icons pb-3">
                <span class="ms-3"><img src="images/icon-umberella.png"  alt=""> 20%</span>
              <span class="ms-3"><img src="images/icon-compass.png"  alt=""> 18km/h</span>
              <span class="ms-3"><img src="images/icon-wind.png"  alt=""> East</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6  text-center  p-0 ">
          <div class="item2  h-100  ">
          <span class="text-white  p-2 bg-secondary bg-opacity-25 text-opacity-50   d-block">${
            arrayDays[oneDay.getDay()]
          }</span>
          <div class="body pt-5 d-flex flex-column align-items-center justify-content-center ">
            <div class="status py-3">
              <img src="https:${
                respose.forecast.forecastday[1].day.condition.icon
              }" class="" alt="">
              <h2 class="text-white py-1 ">${
                respose.forecast.forecastday[1].day.maxtemp_c
              }&deg;C</h2>
              <span class="text-white d-block ">${
                respose.forecast.forecastday[1].day.mintemp_c
              }&deg;C</span>
            </div>
            <h2 class="h6 text-info pt-2 py-lg-0  py-5  ">${
              respose.forecast.forecastday[1].day.condition.text
            }</h2>
          </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 text-center p-0 ">
          <div class="item h-100  ">
            <span class="bg-dark bg-opacity-50 text-white text-opacity-50 bg-opacity-50  p-2 d-block">${
              arrayDays[secondeDay.getDay()]
            }</span>
            <div class="body pt-5 d-flex flex-column align-items-center justify-content-center ">
              <div class="status py-3">
                <img src="https:${
                  respose.forecast.forecastday[2].day.condition.icon
                }" class="" alt="">
                <h2 class="text-white py-1">${
                  respose.forecast.forecastday[2].day.maxtemp_c
                }&deg;C</h2>
                <span class="text-white d-block ">${
                  respose.forecast.forecastday[2].day.mintemp_c
                }&deg;C</span>
              </div>
              <h2 class="h6 text-info pt-2 py-lg-0  py-5  ">${
                respose.forecast.forecastday[2].day.condition.text
              }</h2>
            </div>
          </div>
        </div
       `;
  document.querySelector(".row").innerHTML = containerDate;
}
getdata();

const result= document.querySelector(".result")
const form = document.querySelector(".get-weather")
const nameCity=document.querySelector("#city")
const nameCountry=document.querySelector("#country")

form.addEventListener("submit",(event)=>{
event.preventDefault()
if(nameCity.value===""|| nameCountry.value===""){
    showError("Ambos campos son obligatorios...")
    return
}

else{
console.log(nameCity.value)
console.log(nameCountry.value)}
callApi(nameCity.value, nameCountry.value);
}

)

async function callApi(nameCity, nameCountry){
const APIkey="1a8683f5559bd0e51e3f8ad5fb343723";
const url=`https://api.openweathermap.org/data/2.5/weather?q=${nameCity},${nameCountry}&appid=${APIkey}`

await fetch(url)
.then(response=>{
    return response.json()}
    )
.then(dataJson=>{
    if(dataJson.cod==="404"){
        showError("Ciudad no encontrada")
    }
    else{
        clearHTML()
        showWeather(dataJson)
        console.log(dataJson)
        
    }
    // console.log(data)
})
.catch(error=>{
    console.log(error)
})

}
function showWeather(data){
    const {name, main:{temp, temp_min, temp_max,humidity},weather:[arr]}=data;
    const degrees= kelvinToCentigrade(temp);
    const degreesMin= kelvinToCentigrade(temp_min)
    const degreesMax=kelvinToCentigrade(temp_max)

    const content= document.createElement("div")
    content.innerHTML=`
    <h5>Clima en ${name}</h5>
    <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png">
    <h2>${degrees}ºC</h2>
    <p>Max: ${degreesMax}ºC</p>
    <p>Min:${degreesMin}ºC</p>
    `
    result.appendChild(content)
    // console.log(name)
    // console.log(temp)
    // console.log(temp_min)
    // console.log(temp_max)
    // console.log(humidity)
    // console.log(arr.icon)

}

function showError(message){
    console.log(message)
    const alert= document.createElement("p")
    alert.classList.add("alert-message");
    alert.innerHTML=message;
    form.appendChild(alert)
    setTimeout(()=>{
        alert.remove()
    },3000)
}

function kelvinToCentigrade(temp){
    return parseInt(temp-273.15)
}
function clearHTML(){
    result.innerHTML="";
}



// 

// const apiUrl=`"https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Apikey}`

// fetch(apiUrl )
// .then(respuesta)

// console.log("asd")
// // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
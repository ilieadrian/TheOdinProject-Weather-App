const cityInput = document.getElementById("city-name");
const submitBTN = document.getElementById("button");
const container = document.querySelector(".container")
const inputErrorMessage = document.getElementById("error-mesage")
const overlay = document.getElementById("overlay")
let weatherCard = "";

function fetchData(city) {
  return new Promise((resolve, reject) => {
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=K2LFQUZTBEFMY6X55NN7KWSTF`, { mode: 'cors' })
          .then((response) => {
              if (!response.ok) {
                  
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then((data) => {
              resolve(data);  // Resolve the promise with the data
          })
          .catch((error) => {
            handleError("City not found.")
              reject(`Error: Data fetch failed - ${error.message}`);  // Reject the promise with an error message
          });
  });
}

async function getData(param) {
  let dataIsProcessing = true;
  handleDataProcessing(dataIsProcessing)
  try {
    const data = await fetchData(param);
    dataIsProcessing = false;
    processData(data, param)
    handleDataProcessing(dataIsProcessing)
  } catch (error) {
    console.error("Error:", error);
    overlay.style.display = "none";
  } 
}

function processData(data) {
  const cityName = data.resolvedAddress ;
  const currentTempF = data.currentConditions.temp;
  const currentTempC =  ((currentTempF - 32) * 5/9).toFixed(1);
  const curentCondition = data.currentConditions.conditions;
  const curentConditionDescription = data.description;
  const iconCode = data.currentConditions.icon;
  

  displayData(cityName,currentTempF, currentTempC, curentCondition, curentConditionDescription, iconCode)
}

function handleDataProcessing(dataIsProcessing) {
  if(dataIsProcessing) {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}

function displayData(cityName, currentTempF, currentTempC, curentCondition, curentConditionDescription, iconCode) {
  if(!weatherCard) {
    weatherCard = document.createElement('div');
    weatherCard.classList.add("weather-card");
  }

  let content = "";

  content +=`
            <h2>Weather in ${cityName}</h2>
            <div class="information-container">
                <div class="secondary-information-container">
                    <div class="temp-container">
                        <img src="./images/${iconCode}.png" alt="">
                            <div class="temp">
                                <span>${currentTempC}</span>
                                <p class="temperature">°C |<a href="#" id ="changeScale">°F</a></p>
                            </div>    
                    </div>
                    <p class="weather">Weather condition: ${curentCondition}</p>

                </div>
                <p class="condition-description">${curentConditionDescription}</p>
            </div>
  `;


  weatherCard.innerHTML = content;
  container.appendChild(weatherCard);
}

function validateInput() {
  const cityName = cityInput.value.trim()

  if(cityName.length === 0) {
    handleError("Field cannot be empty")
    return;
  } else {
    handleError(null);
    getData(cityName);
  }
}

function handleError(errorMessage){
  if(errorMessage) {
    inputErrorMessage.style.setProperty("display", "block")
    cityInput.style.setProperty("border", "1px solid red")
    inputErrorMessage.textContent = errorMessage;
  } else {
    inputErrorMessage.style.setProperty("display", "none")
    cityInput.style.removeProperty("border", "1px solid red")
    inputErrorMessage.textContent = "";
  }
}


submitBTN.addEventListener('click', validateInput)

// getData("Bucuresti")


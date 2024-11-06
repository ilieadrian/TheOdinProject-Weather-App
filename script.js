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
              reject(`Error: Data fetch failed - ${error.message}`);  // Reject the promise with an error message
          });
  });
}

// Usage example:

async function getData(param) {
  let dataIsProcessing = true;
  handleDataProcessing(dataIsProcessing)
  try {
    const data = await fetchData(param);
    dataIsProcessing = false;
    processData(data)
    handleDataProcessing(dataIsProcessing)
  } catch (error) {
    console.error("Error:", error)
  } 
}

function processData(data) {
  console.log("Procesdata fired", data)
  const currentTempF = data.currentConditions.temp;
  const currentTempC =  ((currentTempF - 32) * 5/9).toFixed(1);
  const curentCondition = data.currentConditions.conditions;
  const curentConditionDescription = data.description;
  const icon = data.currentConditions.icon;

  console.log(currentTempF, currentTempC, curentCondition, curentConditionDescription, icon)
}

function handleDataProcessing(dataIsProcessing) {
  if(dataIsProcessing) {
    console.log("data Is Processing")
  } else {
    console.log("finished data proceesing")
  }
  
}

getData("Bucuresti")


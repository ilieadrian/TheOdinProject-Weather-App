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
    console.log(data)
    dataIsProcessing = false;
    handleDataProcessing(dataIsProcessing)
  } catch (error) {
    console.error("Error:", error)
  } 
}

function handleDataProcessing(dataIsProcessing) {
  if(dataIsProcessing) {
    console.log("data Is Processing")
  } else {
    console.log("finished data proceesing")
  }
  
}

getData("Buzau")


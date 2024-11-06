const city = "Pascani";
const key = "";

function fetchData() {
  const link = "";
        
    console.log("Getting data")
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city || bucharest}?key=K2LFQUZTBEFMY6X55NN7KWSTF`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
    });
    
}

fetchData()
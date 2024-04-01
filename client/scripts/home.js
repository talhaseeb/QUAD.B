document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Create an object to store the form data
    const formData = {};
  
    // Collect data from text fields
    document.querySelectorAll('input[type="number"]').forEach(input => {
      formData[input.id] = parseFloat(input.value); // Convert value to number
    });
  
    // Collect data from dropdown lists
    document.querySelectorAll('select').forEach(select => {
      // Set all options to 0 initially, except the one with empty value
      Array.from(select.options).forEach(option => {
          if (option.value !== "") {
              formData[select.id + '_' + option.value.toLowerCase().replace(/\s+/g, '_')] = 0;
          }
      });
  
      // Set selected option to 1 if it's not an empty string
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption && selectedOption.value !== "") {
          formData[select.id + '_' + selectedOption.value.toLowerCase().replace(/\s+/g, '_')] = 1;
      }
  });
    
    console.log(formData);
    // Send form data to the backend API
    fetch('http://localhost:8000/api/predict', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
        // Extract the value from the "prediction" key
        const predictionValue = data.prediction;

        // Select the output div
        const outputDiv = document.getElementById('prediction_output');

        // Calculate the range of wastage
        const minWastage = predictionValue;
        const maxWastage = predictionValue + 5;

        // Set the innerHTML of the output div to the wastage range message
        outputDiv.value = minWastage + " to " + maxWastage + " kgs";
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
import AsyncStorage from '@react-native-async-storage/async-storage'
const BASE_URL= 'https://adeahmed-001-site1.ktempurl.com/api';
//const Base2 = "https://dummy.restapiexample.com/api/v1"

// Helper function for making GET requests
export const getRequest = async (url, headers = {}) => {
  try {

    let newurl = `${BASE_URL}/${url}`;
    const response = await fetch(newurl, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json', 
      },
    });

    // Check if response is successful
    // if (!response.ok) {
    //   //check if there is a success property
    //   if(response.hasOwnProperty('success')){
    //     return response.message
    //   } else throw new Error('Network response was not ok')
    // }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  
};

// Helper function for making POST requests
export const postRequest = async (url, body, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(body),
    });

    // Check if response is successful
    // if (!response.ok) {
    //   if(response.hasOwnProperty('success')){
    //     return response.message
    //   } else{
    //     console.log(response)
    //     throw new Error('Network response was not ok')
    //   } 
    // }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
   // console.error('Error while making POST request:', error);
    throw error;
  }
};
export const saveData = async (key, value) => {
  try {
    let newal = JSON.stringify(value)
    await AsyncStorage.setItem(key, newal);
    console.log('Data saved successfully.');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};
export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data:', value);
      return JSON.parse(value);
    } else {
      console.log('No data found for the key:', key);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Data removed successfully.');
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
//bmi calculator

export const calculateBMI = (height, weight) => {
    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const BMI = weight / (heightInMeters * heightInMeters);

    // Determine BMI category based on value
    let category;
    if (BMI < 18.5) {
        category = "underweight";
    } else if (BMI >= 18.5 && BMI < 24.9) {
        category = "normal weight";
    } else if (BMI >= 25 && BMI < 29.9) {
        category = "overweight";
    } else {
        category = "obese";
    }

    // Generate description based on BMI category
    let description;
    switch (category) {
        case "underweight":
            description = "You’re underweight. Don't worry, we're here to help you!";
            break;
        case "normal weight":
            description = "You’re at a normal weight. Keep up the good work!";
            break;
        case "overweight":
            description = "You’re overweight. Let's work together to improve your health!";
            break;
        case "obese":
            description = "You’re obese. It's important to take steps to improve your health.";
            break;
        default:
            description = "Unable to determine BMI category.";
    }

    return `BMI: ${BMI.toFixed(2)}\n${description}`;
};

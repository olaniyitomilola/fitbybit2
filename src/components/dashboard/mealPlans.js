import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { getRequest, saveData, postRequest } from "../../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const MealPlans = ({ navigation }) => {
  const [FoodGroup, setFoodGroup] = useState();
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [activeMealType, setActiveMealType] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState({});
  const [totalCalories, setTotalCalories] = useState({
    Breakfast: "",
    Lunch: "",
    Dinner: "",
  });
  totalCalories;
  const calculateTotalCalories = (mealType) => {
    if (!selectedFoods[mealType]) return null; // Return null if no foods are selected for the meal type

    // Calculate total calories by summing the calories of all selected foods for the meal type
    return selectedFoods[mealType].reduce((total, food) => {
      return total + parseInt(food.calories); // Convert calories to integer before adding
    }, 0);
  };

  const overallTotalCalories = Object.values(totalCalories).reduce(
    (acc, curr) => acc + (parseInt(curr) || 0),
    0
  );

  useEffect(() => {
    const getFoodGroups = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await getRequest("Meal/GetAllFoodGroups", null, {
          Authorization: `Bearer ${accessToken}`,
        });
        setFoodGroup(response.data);
        await saveData("foodgroup", response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    getFoodGroups();
  }, []);

  useEffect(() => {
    const fetchFoodsByGroupID = async () => {
      if (selectedGroupID !== null) {
        try {
          const accessToken = await AsyncStorage.getItem("accessToken");
          const response = await getRequest(
            `Meal/GetAllMealsByFoodGroupId?id=${selectedGroupID}`,
            null,
            {
              Authorization: `Bearer ${accessToken}`,
            }
          );
          setFoods(response.data);
        } catch (error) {
          console.error("Error fetching foods by group ID:", error);
        }
      }
    };

    fetchFoodsByGroupID();
  }, [selectedGroupID]);

  const handleGroupSelection = (groupID) => {
    if (selectedGroupID === groupID) {
      setSelectedGroupID(null); // Deselect if already selected
    } else {
      setSelectedGroupID(groupID); // Otherwise, select the group
    }
  };

  const handleMealTypeSelection = (mealTypeId) => {
    if (activeMealType === mealTypeId) {
      setActiveMealType(null); // Deselect if already selected
      setSelectedGroupID(null); // Deselect the food group
    } else {
      setActiveMealType(mealTypeId); // Select the meal type
    }
  };

  const handleAddFoodToMealType = (food) => {
    if (activeMealType) {
      setSelectedFoods((prevSelectedFoods) => {
        const updatedFoods = { ...prevSelectedFoods };
        if (updatedFoods[activeMealType]) {
          updatedFoods[activeMealType].push(food);
        } else {
          updatedFoods[activeMealType] = [food];
        }
        // Calculate total calories for the active meal type
        const total = calculateTotalCalories(activeMealType);
        setTotalCalories((prevTotalCalories) => ({
          ...prevTotalCalories,
          [activeMealType]:
            total !== null ? total : prevTotalCalories[activeMealType],
        }));
        

        return updatedFoods;
      });
    }
  };

  const handleRemoveFoodFromMealType = (indexToRemove) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = { ...prevSelectedFoods };
      // Get the calories of the food to be removed
      const removedFoodCalories =
        updatedFoods[activeMealType][indexToRemove].calories;
      // Remove the food from the selected foods list
      updatedFoods[activeMealType] = updatedFoods[activeMealType].filter(
        (_, index) => index !== indexToRemove
      );
      // Calculate total calories for the active meal type after removing the food
      const total =
        calculateTotalCalories(activeMealType) - removedFoodCalories;
      // Update the total calories state
      setTotalCalories((prevTotalCalories) => ({
        ...prevTotalCalories,
        [activeMealType]:
          total !== null ? total : prevTotalCalories[activeMealType],
      }));
      return updatedFoods;
    });
  };

  const mealType = [
    {
      name: "Breakfast",
      id: 1,
    },
    {
      name: "Lunch",
      id: 2,
    },
    {
      name: "Dinner",
      id: 3,
    },
  ];

  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS} onPress={addMealPlan}>
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Add Meals to My Plan"
          )}
        </Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS} onPress={addMealPlan}>
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            "Add Meals to My Plan"
          )}
        </Text>
      </Pressable>
    ),
  });

  const addMealPlan = async () => {
    try {
      // Get the access token from AsyncStorage
      const accessToken = await AsyncStorage.getItem("accessToken");

      // Initialize an array to hold the meal plan data
      const mealPlanData = [];

      // Iterate over the selected meal types
      mealType.forEach((type) => {
        // Check if the meal type is selected and has selected foods
        if (selectedFoods[type.id] && selectedFoods[type.id].length > 0) {
          // Prepare mealIds array by extracting ids from selected foods for the current meal type
          const mealIds = selectedFoods[type.id].map((food) => food.id);

          // Construct meal plan object for the current meal type
          const mealPlanItem = {
            mealIds,
            mealType: type.id,
            date: new Date().toISOString().split("T")[0],
          };

          // Push the constructed meal plan object to the mealPlanData array
          mealPlanData.push(mealPlanItem);
        }
      });

      try {
        setIsLoading(true);
        // Make a POST request to add meals to the plan
        const response = await postRequest(
          "Meal/CreateMealPlan",
          mealPlanData,
          accessToken
        );
        Alert.alert("Message", response.message);

        setIsLoading(false);
      } catch (error) {
        console.log(error, "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 15, marginTop: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.heading2}>Select a Meal Type</Text>

          <View style={styles.bgCard}>
            {mealType.map((item) => (
              <View key={item.id}>
                <Pressable
                  onPress={() => handleMealTypeSelection(item.id)}
                  style={[
                    styles.imageAndTextContainer,
                    styles.mealCard,
                    styles.mealTypeContainer,
                    activeMealType === item.id
                      ? styles.activeMealTypeStyle
                      : null,
                  ]}
                >
                  {/* Left side content */}
                  <View>
                    <Text
                      style={{
                        ...styles.heading,
                        fontWeight: "700",
                        color: activeMealType === item.id ? "white" : "black",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>

                  {/* Right side content (calories) */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {/* Adjust as needed */}
                      <Text
                        style={{
                          ...styles.searchButtonText,
                          color: activeMealType === item.id ? "white" : "black",
                        }}
                      >
                        {/* {item.cal} */}
                      </Text>
                    </View>
                  </View>
                </Pressable>

                {/* Conditionally render selected foods inside the active meal type card */}
                {activeMealType === item.id &&
                  selectedFoods[activeMealType]?.length > 0 && (
                    <View style={styles.selectedFoodsContainer}>
                      <Text style={styles.selectedFoodsHeading}>
                        Selected food for{" "}
                        {
                          mealType.find((meal) => meal.id === activeMealType)
                            ?.name
                        }
                      </Text>
                      <View style={styles.selectedFoodsList}>
                        {selectedFoods[activeMealType].map((food, index) => (
                          <View key={index} style={styles.selectedFoodItem}>
                            <Text style={styles.selectedFoodName}  onPress={() =>
                                  handleRemoveFoodFromMealType(index)
                                }>
                              {food.name}
                            </Text>
                            <Pressable>
                              <Text
                                style={{
                                  ...styles.removeIconText,
                                  fontSize: 12,
                                }}
                                onPress={() =>
                                  handleRemoveFoodFromMealType(index)
                                }
                              >
                                x
                              </Text>
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
              </View>
            ))}

            {/* Total calories section */}
            {/* <View className="mt-4">
          <Text style={styles.totalHeading}>Total Calories</Text>
            <Text style={styles.totalsubHeading}>20 CAL</Text>
          </View> */}

            <View className="mt-4">
              <Text style={styles.totalHeading}>Total Calories</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 20 }}>
                  <Text style={styles.totalsubHeading}>
                    {overallTotalCalories} CAL
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Render "Meals Today" section */}
        {activeMealType && (
          <>
            <View className="mt-4">
              <Text style={styles.heading2}>Select Food Categories</Text>
            </View>

            <View className="mt-4">
              {FoodGroup?.map((item) => (
                <View key={item.id}>
                  <Pressable onPress={() => handleGroupSelection(item.id)}>
                    <View
                      style={{
                        ...styles.imageAndTextContainer,
                        ...styles.groupCard,
                      }}
                    >
                      <View style={styles.textContainer}>
                        <Text style={{ ...styles.heading, top: 4 }}>
                          {item.name}
                        </Text>
                      </View>
                      {selectedGroupID !== item.id && (
                        <Text>
                          <AntDesign
                            name="caretdown"
                            size={15}
                            color="#0077CA"
                          />
                        </Text>
                      )}
                      {selectedGroupID === item.id && (
                        <Text>
                          <AntDesign name="caretup" size={15} color="#0077CA" />
                        </Text>
                      )}
                    </View>
                  </Pressable>
                  {/* Conditionally render foods for the selected group */}
                  {selectedGroupID === item.id && (
                    <View>
                      {foods.map((food) => (
                        <View
                          key={food.id}
                          style={styles.imageAndTextContainer}
                        >
                          <View style={styles.textContainer}>
                            <Pressable  onPress={() => handleAddFoodToMealType(food)}>
                            <Text style={styles.exerciseName}>{food.name}</Text>
                            </Pressable>
                          
                            <Text style={styles.exerciseDetails}>
                              Calories: {food.calories}
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => handleAddFoodToMealType(food)}
                          >
                            <Text style={styles.plusSign}>+</Text>
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View className="mt-4">
              <ButtonComponent />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    fontWeight: "600",
  },
  bgCard: {
    backgroundColor: "#e3e8ec",
    marginTop: 10,
    padding: 15,
  },
  mealCard: {
    padding: 10,
    borderRadius: 12,
  },
  groupCard: {
    backgroundColor: "#e3e8ec",
    padding: 10,
  },
  exerciseName: {
    fontSize: 15,
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 10,
    color: "#0077CA",
  },
  plusSign: {
    fontSize: 25,
    color: "#0077CA",
    marginRight: 5,
  },
  imageAndTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E1E8F",
  },
  totalsubHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#262626",
    top: 5,
  },
  textContainer: {
    flex: 1,
  },
  buttonIOS: {
    backgroundColor: "#0077CA",
    padding: 18,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  heading2: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: "#F6F7FB",
    padding: 5,
    borderRadius: 10,
    top: 10,
  },
  searchButtonText: {
    color: "#262626",
    fontSize: 12,
    fontWeight: "600",
  },
  activeMealTypeStyle: {
    backgroundColor: "#0077CA",
  },
  mealTypeContainer: {
    marginBottom: 10,
  },
  selectedFoodsContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  selectedFoodsHeading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectedFoodsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedFoodItem: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedFoodName: {
    fontSize: 13,
  },
  removeIcon: {
    marginLeft: 5,
  },
  removeIconText: {
    color: "red",
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "700",
  },
});

export default MealPlans;

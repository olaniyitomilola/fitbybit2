import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { getRequest, saveData } from "../../../helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const MealPlans = ({ navigation }) => {
  const [FoodGroup, setFoodGroup] = useState();
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [activeMealType, setActiveMealType] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState({});
  const [totalCalorie, setTotalCalorie] = useState(0);

  const handleCalorie = (calories)=>{
    setTotalCalorie(totalCalorie + calories);
  }

  useEffect(() => {
    const getFoodGroups = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await getRequest("Meal/GetAllFoodGroups", null, {
          Authorization: `Bearer ${accessToken}`,
        });
        setFoodGroup(response.data);
        // console.log(response.data, "Fodogroup")
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
        return updatedFoods;
      });
    }
  };

  const handleRemoveFoodFromMealType = (indexToRemove) => {
    setSelectedFoods((prevSelectedFoods) => {
      const updatedFoods = { ...prevSelectedFoods };
      updatedFoods[activeMealType] = updatedFoods[activeMealType].filter(
        (_, index) => index !== indexToRemove
      );
      return updatedFoods;
    });
  };

  const mealType = [
    {
      name: "Breakfast",
      cal: "2000Kcal",
      image: require("../../../assets/Images/line-straight.png"),
      id: 1,
    },
    {
      name: "Lunch",
      cal: "500cal",
      image: require("../../../assets/Images/line-straight.png"),
      id: 2,
    },
    {
      name: "Dinner",
      cal: "2000Kcal",
      image: require("../../../assets/Images/line-straight.png"),
      id: 3,
    },
  ];

  /* Button Component*/
  const ButtonComponent = Platform.select({
    ios: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>Add Meals to My Plan</Text>
      </Pressable>
    ),
    android: () => (
      <Pressable style={styles.buttonIOS}>
        <Text style={styles.buttonText}>Add Meals to My Plan</Text>
      </Pressable>
    ),
  });

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
                            <Text style={styles.selectedFoodName}>
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
          <View className="mt-4">
          <Text style={styles.totalHeading}>Total Calories</Text>
            <Text style={styles.totalsubHeading}>{totalCalorie} CAL</Text>
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
                            <Text style={styles.exerciseName}>{food.name}</Text>
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
    fontSize: 12,
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
    fontSize: 12,
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 8,
    color: "#0077CA",
  },
  plusSign: {
    fontSize: 20,
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
    fontSize: 15,
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
    fontSize: 10,
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

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import AboutUsScreen from './components/AboutUsScreen';
import PictureResultScreen from './components/PictureResultScreen';
import PictureUploadFruitScreen from './components/PictureUploadFruitScreen';
// import PictureUploadVegetableScreen from './components/PictureUploadVegetableScreen';
import SelectFruitScreen from './components/SelectFruitScreen';
import SelectMaterialScreen from './components/SelectMaterialScreen';
// import SelectMeatScreen from './components/SelectMeatScreen';
// import SelectVegetableScreen from './components/SelectVegetableScreen';
// import RecentScreen from './components/RecentScreen';r

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SelectMaterial" component={SelectMaterialScreen} />
        
        <Stack.Screen name="SelectFruit" component={SelectFruitScreen} />
        {/* <Stack.Screen name="SelectVegetable" component={SelectVegetableScreen} /> */}
        {/* <Stack.Screen name="SelectMeat" component={SelectMeatScreen} /> */}

        <Stack.Screen name="PictureUploadFruit" component={PictureUploadFruitScreen} />
        {/* <Stack.Screen name="PictureUploadVegetable" component={PictureUploadVegetableScreen} /> */}
        <Stack.Screen name="PictureResult" component={PictureResultScreen} />

        {/* <Stack.Screen name="Recent" component={RecentScreen} /> */}
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import Home from './screens/Home';
import Random from './screens/Random';
import Search from './screens/Search';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Random') {
              iconName = focused
                ? 'glass-cocktail'
                : 'glass-cocktail';
            }
            else if (route.name === 'Search') {
              iconName = focused
                ? 'magnify'
                : 'magnify';
            }
            else if (route.name === 'Profile') {
              iconName = focused
                ? 'face-man'
                : 'face-man-outline';
            }
            return <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />;
          },
          tabBarActiveTintColor: 'steelblue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Random" component={Random} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
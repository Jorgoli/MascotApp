import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './app/navigator/HomeScreen';
import LoginScreen from './app/navigator/LoginScreen';
import RegisterScreen from './app/navigator/RegisterScreen';
import ProfileScreen from './app/navigator/ProfileScreen';
import MyPetsScreen from './app/navigator/MyPetsScreen';
import AddPetScreen from'./app/navigator/AddPetScreen';
import MyLosesScreen from'./app/navigator/MyLosesScreen';
import LossScreen from  './app/navigator/LossScreen';
import AddPostScreen from './app/navigator/AddPostScreen';
import UpdatePetScreen from './app/navigator/UpdatePetScreen';

const Stack = createStackNavigator();

class App extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {        
    return (  
      <NavigationContainer>        
        <Stack.Navigator 
          initialRouteName='Login'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#05668D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {},
          }}
        >
          <Stack.Screen 
            name='Home' 
            component={HomeScreen}
            options={{
              title: 'Inicio',              
            }}
          />
          <Stack.Screen 
            name='Login' 
            component={LoginScreen}
            options={{
              title: 'Iniciar sesión',  
              headerLeft: null,            
            }}
          />
          <Stack.Screen 
            name='Register' 
            component={RegisterScreen}
            options={{
              title: 'Registro',              
            }}
          />
          <Stack.Screen 
            name='Profile' 
            component={ProfileScreen}
            options={{
              title: 'Perfil',              
            }}
          />
          <Stack.Screen 
            name='MyPets' 
            component={MyPetsScreen}
            options={{
              title: 'Mis mascotas',              
            }}
          />
          <Stack.Screen 
            name='AddPet' 
            component={AddPetScreen}
            options={{
              title: 'Agregar mascota',              
            }}
          />
          <Stack.Screen 
            name='MyLoses' 
            component={MyLosesScreen}
            options={{
              title: 'Mis extravíos',              
            }}
          />
          <Stack.Screen 
            name='Loss' 
            component={LossScreen}
            options={{
              title: 'Información del extravío',              
            }}
          />
          <Stack.Screen 
            name='AddPost' 
            component={AddPostScreen}
            options={{
              title: 'Reportar extravío',              
            }}
          />
          <Stack.Screen 
            name='UpdatePet' 
            component={UpdatePetScreen}
            options={{
              title: 'Información de tu mascota',              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer> 
    );
  }
};

export default App;

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';

import Post from '../../components/post';

function LogoTitle() {  
  return (
      <Text 
        style={{
          color: '#fff', 
          fontSize: 18, 
          fontWeight: 'bold'
        }}
      >
          Inicio
      </Text>
  );
}

export default function HomeScreen({navigation, route}) {

  const { content, username } = route.params;
  var toManage = content;  
  toManage = toManage.split('~');
  toManage.pop();
  var posts = [];

  if(toManage.length !== 0) {
    for(let i = 0; i < toManage.length; i++) {
      toManage[i] = toManage[i].split('|');
      
      posts.push(
        <Post         
          idPost={toManage[i][0]}
          idPet={toManage[i][3]}
          user={toManage[i][4]}
          name={toManage[i][2]}
          text={toManage[i][1]}
          action={() => {
            ToastAndroid.show('Cargando...', ToastAndroid.SHORT);
            fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/getExtraPostInfo.php?idPet=' + 
              toManage[i][3] + '&username=' + toManage[i][4])
            .then(function(response) {
              response.text()
                .then(function(text) {
                  response = text.split('|');  

                  navigation.push('Loss', { 
                    idPost: toManage[i][0],
                    idPet: toManage[i][3],
                    user: toManage[i][4],
                    name: toManage[i][2],
                    text: toManage[i][1], 
                    email: response[0],
                    race: response[1],
                    age: response[2],
                    chars: response[3],
                    previousScreen: 'HOME',
                  })              
                });                    
            })
          }}
        />
      );
    }
  }
  else {
    posts.push(<Text>!No hay posts aún, vuelve más tarde!</Text>);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({  
      headerLeft: null,       
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', {user: username})}>
          <Text style={{         
            fontSize: 16,
            color: '#fff',
            textDecorationLine: 'underline',  
            padding: 15,                      
          }}>
            Ir a mi perfil
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);  

      return(
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.scrollView} >     
            {posts}
          </ScrollView>
        </SafeAreaView> 
      );
  }

  const styles = StyleSheet.create({
    scrollView: {   
      minWidth: Dimensions.get('window').width,
      minHeight: Dimensions.get('window').height,
      backgroundColor: '#00A896',        
      alignItems: 'center',
      padding: 8,    
    },
  });
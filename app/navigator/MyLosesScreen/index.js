import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';

import Post from '../../components/post';

export default function MyLosesScreen({navigation, route}) {

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
                    previousScreen: 'MYLOSES',
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

    return(
      <View style={{flex: 1}}>
        <SafeAreaView>
          <ScrollView 
            contentContainerStyle={styles.scrollView}>     
            {posts}
          </ScrollView>
        </SafeAreaView> 

        <View style={styles.fixedView}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
              fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/getUserPets.php?username=' + username)
                .then(response => {
                  if(!response.ok) {
                    alert("Error FetchPets response");
                  }
                  else {
                    response.text()
                      .then(text => {
                        let txt = text;

                        navigation.navigate('AddPost', {content: txt, username: username});
                      })          
                  }        
                })
            }}
          >
            <Text style={styles.addTxt}>+</Text>  
          </TouchableOpacity>  
        </View>
      </View>        
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
    fixedView : {
      position: 'relative',
      left: 25,
      bottom: 25,    
      justifyContent: 'flex-end',
    },
    addButton: {
      position: 'absolute',
      right: 40,
      bottom: 20,
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#B53F8C',
      justifyContent: 'center',
    },
    addTxt: {    
      textAlign: 'center',
      fontSize: 45,
      color: '#fff',
    },
  });
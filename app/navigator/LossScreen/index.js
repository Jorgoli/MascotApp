import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Alert,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import Post from '../../components/post';

export default function LossScreen({navigation, route}) {  
  const {idPost, idPet, user, name, text, email, race, chars, age, previousScreen} = route.params;

  let changeButtons = [];

  if(previousScreen == "MYLOSES") {
    changeButtons.push(
      <View style={styles.fixedView}>
          <TouchableOpacity 
            style={styles.foundButton}
            onPress={() => {
              Alert.alert(
                'Confirmar',
                '¿Deseas marcar como encontrado? Tu extravío dejará de aparecer en el inicio. Esta acción es irreversible.',
                [
                  { text: 'No', onPress: () => console.log('No pressed at MarkAsFound')},
                  { text: 'Sí', onPress: () => {
                    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/markPostAsFound.php?id=' + idPost)
                      .then(response => {
                        if(!response.ok) {
                          alert('Error interno FetchMarkPostAsFound fetch.')
                        }
                        else {
                          response.text()
                            .then(text => {
                              if(text == "ACTUALIZADO") {
                                ToastAndroid.show('Actualizado con éxito.', ToastAndroid.SHORT);
                                navigation.navigate('Profile', {user: user});
                              }
                              else if(text == "ERROR") {
                                alert('Error interno FetchMarkPostAsFound server.');
                              }
                            })
                        }
                      })
                    } 
                  }],
                  { cancelable: false }
              );
            }}
          >
            <Text style={styles.foundTxt}>✓</Text>  
        </TouchableOpacity>       
        <TouchableOpacity 
            style={styles.dropButton}
            onPress={() => {
              Alert.alert(
                'Confirmación',
                '¿Deseas borrar el extravío? Dejará de aparecer en el inicio y en Mis extravíos. Esta acción es irreversible.',
                [
                  { text: 'No', onPress: () => console.log('No pressed at DropPost') },
                  { text: 'OK', onPress: () => {
                    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/dropPost.php?id=' + idPost)
                      .then(response => {
                        if(!response.ok) {
                          alert('Error interno FetchDropPost response.');
                        }
                        else {
                          response.text()
                            .then(text => {
                              if(text == "ELIMINADO") {
                                ToastAndroid.show('Eliminado con éxito.', ToastAndroid.SHORT);
                                navigation.navigate('Profile', {user: user});
                              }
                            })
                        }
                      })
                    }}
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.dropTxt}>🗑</Text>  
        </TouchableOpacity>    
      </View>
    )
  }
    return(
      <View style={{flex: 1}}>
        <ScrollView 
          contentContainerStyle={styles.scrollView}>     
          <Post 
            name={name}
            text={text}         
          />   
          <Text style={styles.info}>Contacto del dueño: {email}</Text>
          <Text style={styles.info}>Raza de la mascota: {race}</Text>                
          <Text style={styles.info}>Edad: {age}</Text>
          <Text style={styles.info}>Rasgos particulares: {chars}</Text>
        </ScrollView>
        {changeButtons}        
    </View>
    );
  }

  const styles = StyleSheet.create({
    scrollView: {     
      minWidth: Dimensions.get('window').width,
      minHeight: Dimensions.get('window').height,
      backgroundColor: '#00A896',        
      justifyContent: 'center',            
      padding: 8,    
    },
    info: {
      paddingLeft: 25,
      padding: 8,
      textAlign: 'left',
      fontSize: 16,
      color: '#fff',
    },
    fixedView : {
      position: 'relative',
      left: 25,
      bottom: 25,    
      justifyContent: 'flex-end',
    },
    foundButton: {
      position: 'absolute',
      right: 60,
      bottom: 100,
      width: 55,
      height: 55,
      borderRadius: 50,
      backgroundColor: '#2EBD5E',
      justifyContent: 'center',
    },
    dropButton: {
      position: 'absolute',
      right: 60,
      bottom: 25,
      width: 55,
      height: 55,
      borderRadius: 50,
      backgroundColor: '#A43422',
      justifyContent: 'center',
    },
    foundTxt: {    
      textAlign: 'center',
      fontSize: 35,
      color: '#fff',
    },
    dropTxt: {    
      textAlign: 'center',
      fontSize: 28,
      color: '#fff',
    },
  });
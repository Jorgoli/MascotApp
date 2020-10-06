import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PetButton from '../../components/petButton';

export default function MyPets({navigation, route}) {

  const { content, username } = route.params;

  var toManage = content;  
  toManage = toManage.split('~');
  toManage.pop();

  var pets = [];

  if(toManage.length !== 0) {
    for(let i = 0; i < toManage.length; i++) {
      toManage[i] = toManage[i].split('|');
      
      pets.push(
        <PetButton         
          name={toManage[i][1]}
          action={() => {
            navigation.push('UpdatePet', {               
              id: toManage[i][0],              
              name: toManage[i][1],
              race: toManage[i][2],
              age: toManage[i][3],
              chars: toManage[i][4],
              username: username,
            })
          }}
        />
      );
    }
  }
  else {
    pets.push(<Text>!No tienes mascotas aún, agrégalas!</Text>);
  }
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            style={styles.logo}
            source={{
              uri:
                'https://image.freepik.com/vector-gratis/dog-cat-logo-template-veterinaria_56473-115.jpg',
            }}
          />
          <Text style={styles.txtUser}>@Username</Text>

          {pets}            
          
        </ScrollView>
        <View style={styles.fixedView}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.push('AddPet', {user: username})}
          >
            <Text style={styles.addTxt}>+</Text>  
          </TouchableOpacity>  
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  scrollView: {     
    alignItems: 'center',
    backgroundColor: '#00A896',
    minWidth: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height,
    padding: 8,
  },
  fixedView : {
    position: 'relative',
    left: 25,
    bottom: 25,    
    justifyContent: 'flex-end',
  },
  logo: {    
    borderRadius: 50,
    height: 75,
    width: 75,
    marginBottom: 15,
    marginTop: 25,
  },
  button: {
    height: 50,
    width: 300,
    alignSelf: 'center',    
    backgroundColor: '#fff',
    marginBottom: 15,
    justifyContent: 'center',
    borderRadius: 7,
  },
  addButton: {
    position: 'absolute',
    right: 60,
    bottom: 25,
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#B53F8C',
    justifyContent: 'center',
  },
  textBtn: {
    paddingLeft: 15,
    color: '#515151',
    fontWeight: 'bold',
  },
  txtUser: {    
    color: '#fff',
    marginBottom: 50,    
  },
  addTxt: {    
    textAlign: 'center',
    fontSize: 40,
    color: '#fff',
  },
});

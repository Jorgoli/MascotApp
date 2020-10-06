import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,  
  Dimensions,
  SafeAreaView,
  ToastAndroid,
  Alert,
} from 'react-native';

class AddPetScreen extends Component {

  constructor(props) {
    super(props);

    const {user} = this.props.route.params;

    this.state = {
      name: '',
      race: '',
      age: '',
      chars: '',
      username: user,
    }
  }

  fetchPetAdd = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/addPet.php?name=' + 
      this.state.name + '&breed=' + this.state.race + '&age=' + this.state.age + 
      '&rasgos=' + this.state.chars + '&username=' + this.state.username)
      .then(response => {
        if(!response.ok) {
          alert('Error FetchPetAdd response');
        }
        else {
          response.text()
          .then(text => {
            if(text == "INSERTADO") {
              ToastAndroid.show('Añadida correctamente.', ToastAndroid.SHORT);
              this.props.navigation.navigate('Profile');
            }
            else if(text == "ERROR") {
              Alert.alert(
                'Alerta',
                'Error al agregar. Intenta más tarde.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
              );
            }
            else {
              Alert.alert(
                'Alerta',
                'Error interno FetchPetAdd server.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false }
              );
            }
          })
        }        
      })
  }

  handleAdd = () => {
    ToastAndroid.show('Procesando...', ToastAndroid.SHORT);
    this.fetchPetAdd();
  }

  setName = inputText => {
    this.setState({name: inputText});
  }

  setRace = inputText => {
    this.setState({race: inputText});
  }

  setAge = inputText => {
    this.setState({age: inputText});
  }

  setChars = inputText => {
    this.setState({chars: inputText});
  }

  render() {    
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image 
            style={styles.logo}
            source={{uri: 'https://image.freepik.com/vector-gratis/dog-cat-logo-template-veterinaria_56473-115.jpg'}}          />
          <TextInput 
            style={styles.input}
            placeholder={"Nombre de tu mascota"}
            placeholderTextColor={'#fff'}     
            onChangeText={this.setName}     
            value={this.state.name}            
          />
          <TextInput 
            style={styles.input}
            placeholder={"Raza"}
            placeholderTextColor={'#fff'}
            onChangeText={this.setRace}     
            value={this.state.race} 
          />
          <TextInput 
            style={styles.input}
            placeholder={"Edad"}
            placeholderTextColor={'#fff'}
            onChangeText={this.setAge}     
            value={this.state.age} 
            keyboardType='numeric'
          />
          <TextInput 
            style={styles.input}
            placeholder={"Rasgos"}
            placeholderTextColor={'#fff'}
            onChangeText={this.setChars}     
            value={this.state.chars} 
          />
          <TouchableOpacity 
            style={styles.buttonAdd}
            onPress={this.handleAdd}
          >
            <Text style={styles.textRegister}>Agregar mascota</Text>
          </TouchableOpacity>        
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {    
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#00A896',
    padding: 8,  
  },
  logo: {          
    height: 150,
    width: 250,    
    marginTop: 10,
    borderRadius: 7,
    marginBottom: 20,
  },
  input: {    
    height: 50,
    width: 250,
    color: '#fff',  
    textAlign: 'left',    
    borderBottomWidth: 1, 
    borderBottomColor: '#fff',   
    marginBottom: 20,  
  },
  buttonAdd: {      
    height: 40,
    width: 150,
    backgroundColor: '#028090',
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 7,
  },
  textRegister: {
    textAlign: 'center',    
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default AddPetScreen;

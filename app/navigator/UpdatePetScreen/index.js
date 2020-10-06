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
  Alert,
  ToastAndroid,
} from 'react-native';

class UpdatePetScreen extends Component {

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    const {id, name, race, age, chars, username} = this.props.route.params;

    
    this.state = {
      id: id,
      name: name,
      race: race,
      age: age,
      chars: chars,
      username: username,
    }
  }

  fetchPetUpdate = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/updatePet.php?id=' + 
      this.state.id + '&name=' + this.state.name + '&breed=' + this.state.race + 
      '&age=' + this.state.age + '&chars=' + this.state.chars)
      .then(response => {
        if(!response.ok) {
          alert('Error FetchPetUpdate response');
        }
        else {
          response.text()
            .then(text => {
              if(text == "ACTUALIZADO") {
                ToastAndroid.show('Actualizado con éxito.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Profile', { user: this.state.username});
              }
              else if(texto == "ERROR") {
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
                  'Error interno FetchPetUpdate server.',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false }
                );
              }     
            })
        }
      })
  }

  setName = inputText => {
    this.setState({ name: inputText });
  }

  setRace = inputText => {
    this.setState({ race: inputText });
  }

  setAge = inputText => {
    this.setState({ age: inputText });
  }

  setChars = inputText => {
    this.setState({ chars: inputText });
  }

  handleUpdate() {
    ToastAndroid.show('Procesando cambios...', ToastAndroid.SHORT);
    this.fetchPetUpdate();
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image 
            style={styles.logo}
            source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg'}}          /
          >
          <TextInput 
            style={styles.input}
            placeholder={"Nombre"}
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
          />
          <TextInput 
            style={styles.input}
            placeholder={"Rasgos particulares"}
            placeholderTextColor={'#fff'}
            onChangeText={this.setChars}
            value={this.state.chars}
          />
          <TouchableOpacity 
            style={styles.buttonUpdate}
            onPress={() => this.handleUpdate()}
          >
            <Text style={styles.textUpdate}>Actualizar información</Text>
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
  buttonUpdate: {      
    height: 45,
    width: 150,
    backgroundColor: '#028090',
    marginTop: 40,
    justifyContent: 'center',
    borderRadius: 7,
  },
  textUpdate: {
    textAlign: 'center',    
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default UpdatePetScreen;

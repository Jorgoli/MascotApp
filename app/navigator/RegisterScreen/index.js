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
} from 'react-native';

class RegisterScreen extends Component {

  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }

  state = {
    username: '',
    password: '',
    email: '',
  }

  setUsername = inputText => {
    this.setState({ username: inputText });
  }

  setPassword = inputText => {
    this.setState({ password: inputText });
  }

  setEmail = inputText => {
    this.setState({ email: inputText });
  }

  responseFromWeb = () => {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        if (xhttp.responseText == 'INSERTADO') {
          Alert.alert(
            '¡Éxito!',
            'Te registraste correctamente, ya puedes iniciar sesión.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
          this.props.navigation.navigate('Login');
        } 
        else if (xhttp.responseText == 'EXISTENTE') {
          Alert.alert(
            'Alerta',
            'Usuario y/o email ya registrado(s).',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Alerta',
            'Error interno.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        }
      }
    };
    xhttp.open(
      'GET',
      'https://marimbaschiapanecas.000webhostapp.com/MascotasApp/addUser.php?username=' + 
      this.state.username +'&password=' + this.state.password + '&email=' + this.state.email,
      true
    );
    xhttp.send();
  };

  handleRegister() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(this.state.email) === true){
      this.responseFromWeb();
    }     
    else {
      Alert.alert(
        'Alerta',
        'Formato de email incorrecto.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } 
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image 
            style={styles.logo}
            source={{uri: 'https://image.freepik.com/vector-gratis/dog-cat-logo-template-veterinaria_56473-115.jpg'}}          />
          <TextInput 
            style={styles.input}
            placeholder={"Usuario"}
            placeholderTextColor={'#fff'}
            autoCompleteType={'username'}
            onChangeText={this.setUsername}
            value={this.state.username}
          />
          <TextInput 
            style={styles.input}
            placeholder={"Contraseña"}
            placeholderTextColor={'#fff'}
            secureTextEntry={true}
            onChangeText={this.setPassword}
            value={this.state.password}
          />
          <TextInput 
            style={styles.input}
            placeholder={"Correo electrónico"}
            placeholderTextColor={'#fff'}
            autoCompleteType={'email'}
            onChangeText={this.setEmail}
            value={this.state.email}
          />
          <TouchableOpacity 
            style={styles.buttonRegister}
            onPress={() => this.handleRegister()}
          >
            <Text style={styles.textRegister}>Crear cuenta</Text>
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
  buttonRegister: {      
    height: 40,
    width: 150,
    backgroundColor: '#028090',
    marginTop: 40,
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

export default RegisterScreen;

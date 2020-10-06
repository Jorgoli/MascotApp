import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';

class Login extends Component {

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  state = {
    username: '',
    password: '',
  }

  setUsername = inputText => {
    this.setState({ username: inputText });
  }

  setPassword = inputText => {
    this.setState({ password: inputText });
  }

  fetchPosts = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/getAllPosts.php')
      .then(response => {
        if(!response.ok) {
          alert("Error FetchPosts response");
        }
        else {
          response.text()
            .then(text => {
              let txt = text;

              this.props.navigation.navigate('Home', {content: txt, username: this.state.username});
            })          
        }        
      })
  }

  fetchLogin = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/login.php?username=' 
      + this.state.username + '&password=' + this.state.password)      
      .then(response => {
        if(!response.ok) {
          alert("Error FetchLogin response");
        }  
        else {
          response.text()
            .then(text => {              
              let promise = text;

              if(promise == "ACCESO") {
                ToastAndroid.show('Cargando...', ToastAndroid.SHORT);
                this.fetchPosts();
              }
              else if(promise == "DENEGADO") {
                Alert.alert(
                  'Alerta',
                  'Usuario y/o contraseña incorrecto(s).',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false }
                );
              }
              else {
                Alert.alert(
                  'Alerta',
                  'Error interno Login.',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false }
                );
              }
            })
        }              
       })
  }

  handleLogin() {
    ToastAndroid.show('Iniciando sesión...', ToastAndroid.SHORT);
    this.fetchLogin();
  }

  handleRegister() {
    this.props.navigation.navigate('Register');
  } 

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image 
          style={styles.logo}
          source={{uri: 'https://image.freepik.com/vector-gratis/dog-cat-logo-template-veterinaria_56473-115.jpg'}}          
        />
        
        <TextInput 
          style={styles.input}
          placeholder={"Usuario"}
          placeholderTextColor={'#fff'}
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

        <TouchableOpacity 
          style={styles.buttonLogin}
          onPress={() => this.handleLogin()}
        >
          <Text style={styles.textEntrar}>Iniciar sesión</Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
            <TouchableOpacity onPress={() => this.handleRegister()}>
              <Text style={styles.textRegistrar}>
                Crear nueva cuenta
              </Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00A896', 
    padding: 8,  
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  logo: {
    justifyContent: 'center',
    backgroundColor: '#028090',
    borderRadius: 7,
    height: 250,
    width: 250,
    alignSelf: 'center',
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
  buttonLogin: {      
    height: 40,
    width: 130,
    backgroundColor: '#028090',
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 7,
  },
  textEntrar: {
    textAlign: 'center',    
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  textRegistrar: {
    textAlign:'center',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default Login;

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  View,
  ToastAndroid,
} from 'react-native';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.handleGoMyPets = this.handleGoMyPets.bind(this);
    this.handleGoMyLoses = this.handleGoMyLoses.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    const {user} = this.props.route.params;
    this.state = {
      username: user,
    }

    this.props.navigation.setOptions({  
      headerLeft: null,       
      headerRight: () => (
        <TouchableOpacity onPress={this.handleGoHome}>
          <Text style={{         
            fontSize: 16,
            color: '#fff',
            textDecorationLine: 'underline',  
            padding: 15,                      
          }}>
            Ir al inicio
          </Text>
        </TouchableOpacity>
      ),
    });
  }

  handleGoHome = () => {
    ToastAndroid.show('Cargando...', ToastAndroid.SHORT);
    this.fetchAllPosts();
  }

  fetchAllPosts = () => {
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

  handleGoMyPets() {
    this.fetchPets();
  }

  handleGoMyLoses() {
    this.fetchPosts();
  }

  handleLogout() {
    this.props.navigation.navigate('Login');
  }

  fetchPosts = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/getUserPosts.php?username=' + this.state.username)
      .then(response => {
        if(!response.ok) {
          alert("Error FetchPosts response");
        }
        else {
          response.text()
            .then(text => {
              let txt = text;

              this.props.navigation.navigate('MyLoses', {content: txt, username: this.state.username});
            })          
        }        
      })
  }

  fetchPets = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/getUserPets.php?username=' + this.state.username)
      .then(response => {
        if(!response.ok) {
          alert("Error FetchPets response");
        }
        else {
          response.text()
            .then(text => {
              let txt = text;

              this.props.navigation.navigate('MyPets', {content: txt, username: this.state.username});
            })          
        }        
      })
  }

  render() {    
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          style={styles.logo}
          source={{
            uri:
              'https://image.freepik.com/vector-gratis/dog-cat-logo-template-veterinaria_56473-115.jpg',
          }}
        />
        <Text style={styles.txtUser}>@{this.state.username}</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.handleGoMyPets()}
        >
          <Text style={styles.textBtn}>Mis mascotas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.handleGoMyLoses()}
        >
          <Text style={styles.textBtn}>Mis extravíos</Text>
        </TouchableOpacity>

        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.buttonExit}
            onPress={() => this.handleLogout()}
          >
            <Text style={styles.textExit}>Cerrar sesión</Text>
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
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
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
    backgroundColor: '#028090',
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 7,
  },
  textBtn: {
    paddingLeft: 15,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  txtUser: {    
    color: '#fff',
    marginBottom: 50,    
  },
  buttonExit: {
    height: 40,
    width: 130,
    backgroundColor: '#A43422',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textExit: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
  },
});

export default Profile;

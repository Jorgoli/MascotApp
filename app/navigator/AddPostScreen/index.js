import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Text,  
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';

import PetButton from '../../components/petButton';

export default class AddPostScreen extends Component{
  constructor(props){
    super(props);

    const {content, username} = this.props.route.params;

    this.state = {
      parentScrollEnabled: true,
      childScrollEnabled: true,
      childScrollViewContentOffsetY: 0,
      text: '',
      content: content,
      username: username,
      pet: '',
    }
  }

  setText = textInput => {
    this.setState({text: textInput});    
  }
    
  handleChildScrollViewDirection = (e) =>{
    if(e.nativeEvent.layoutMeasurement.height + e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height){
      if(Platform.OS == 'android'){
        this.refs.parentScrollView.scrollToEnd({duration: 500});
      }
      else if(Platform.OS == 'ios'){
        this.refs.parentScrollView.scrollToEnd({animated: true});
      }
    }
    else if(this.state.childScrollViewContentOffsetY >= e.nativeEvent.contentOffset.y && e.nativeEvent.contentOffset.y < 10){
      if(Platform.OS == 'android'){
        this.refs.parentScrollView.scrollTo({x: 0, y: 0, duration: 1});
      }
      else if(Platform.OS == 'ios'){
        this.refs.parentScrollView.scrollTo({x: 0, y: 0, animated: true});
      }
    }
  }

  fetchAddPost = () => {
    fetch('https://marimbaschiapanecas.000webhostapp.com/MascotasApp/addPost.php?pet=' +
      this.state.pet + '&username=' + this.state.username + '&text=' + this.state.text)
      .then(response => {
        if(!response.ok) {
          alert('Error interno FetchAddPost response.');                    
        }
        else {
          response.text()
            .then(text => {
              if(text == "INSERTADO") {
                ToastAndroid.show('Publicado con éxito.', ToastAndroid.SHORT);
                this.props.navigation.navigate('Profile');
              }
              else if(text == "ERROR"){
                alert('Error interno FetchAddPost server.');
              }
            })
        }
      })
  }

  handleAdd = () => {
    if(this.state.pet == '') {
      alert('Elige primero una mascota.')
    }
    else {
      if(this.state.text == '') {
        alert('Primero da algo de información sobre el extravío.');
      }
      else {
        ToastAndroid.show('Publicando extravío...', ToastAndroid.SHORT);
        this.fetchAddPost();
      }
    }
  }

  render() {

    var toManage = this.state.content;  
    toManage = toManage.split('~');
    toManage.pop();

    var pets = [];

    if(toManage.length !== 0) {
      for(let i = 0; i < toManage.length; i++) {
        toManage[i] = toManage[i].split('|');
        
        pets.push(
          <PetButton      
            id={toManage[i][0]}   
            name={toManage[i][1]}
            action={() => {
              this.setState({pet: toManage[i][0]});
              ToastAndroid.show('Seleccionado ' + toManage[i][1], ToastAndroid.SHORT);              
            }}
          />
        );
      }
    }
    else {
      pets.push(<Text>!No tienes mascotas aún, agrégalas!</Text>);
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView           
          contentContainerStyle={styles.container, {flexGrow: 1}}
          ref='parentScrollView'
          scrollEnabled={this.state.parentScrollEnabled}
        >
          <Text style={styles.header}>Elige tu mascota extraviada</Text>

          <View style={styles.petScrollView}>
            <ScrollView 
              style={styles.petsContainer} 
              contentContainerStyle={{flexGrow: 1}}
              scrollEnabled={this.state.childScrollEnabled}
              onScrollBeginDrag={(e) => this.setState({ childScrollViewContentOffsetY: e.nativeEvent.contentOffset.y})}
              onScrollEndDrag={(e)=> this.handleChildScrollViewDirection(e)}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => this.setState({parentScrollEnabled: false, childScrollEnabled: true})}                
              >

                {pets}

              </TouchableOpacity>

              </ScrollView>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={() => this.setState({parentScrollEnabled: true})}
              >
                <TextInput 
                  style={styles.input}
                  multiline={true}
                  placeholder='Escribe aquí información relevante que pueda ayudar a otros a encontrar a tu mascota.'
                  textAlignVertical={'top'}
                  maxLength={180} 
                  onChangeText={this.setText}
                  value={this.state.text}                 
                />
                <Text style={{color: '#fff', paddingLeft: 5}}>{this.state.text.length}/180</Text>

                <TouchableOpacity 
                  style={styles.buttonAdd}
                  onPress={this.handleAdd}
                >
                  <Text style={styles.textRegister}>Publicar extravío</Text>
                </TouchableOpacity> 
                
              </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00A896', 
    padding: 8,  
  }, 
  petScrollView: {
    height: 275,
    width: 320,
    alignSelf: 'center',    
  },
  petsContainer: {
    padding: 8,
    backgroundColor: '#05668D',
    borderRadius: 7,
  },
  buttonAdd: { 
    marginTop: 40,
    alignSelf: 'center',    
    height: 40,
    width: 150,
    backgroundColor: '#028090',    
    justifyContent: 'center',
    borderRadius: 7,
  },
  input: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: 320,
    height: 110,
    opacity: 0.5,
    borderRadius: 7,    
  },
  header: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  textRegister: {
    textAlign: 'center',    
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
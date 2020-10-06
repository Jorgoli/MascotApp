import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

class Post extends Component {

  constructor(props) {
    super(props);    
  }

  render() {
    const {idPost, idPet, user, name, text, action} = this.props;      
    return (      
      <View style={styles.cardContainer}>
        <Image
            style={styles.img}
            source={{ 
              uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg'
            }}
        />

        <TouchableOpacity 
          style={styles.cardContent}
          onPress={action}
        >          
          <Text style={styles.locationText}>{name}</Text>
          <Text style={styles.infoText}>{text}</Text>
        </TouchableOpacity>
      </View>            
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',    
    borderRadius: 7,
    height: 400,    
    marginBottom: 15, 
  },  
  img: {
    height: 180,
    width: 330,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  cardContent: {    
    height: 220,
    width: 330,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 7,    
    borderBottomRightRadius: 7,
  },
  infoText: {   
    padding: 15,
    height: 165,
    borderRadius: 7,
    fontSize: 18,
  },
  locationText: {
    height: 45,
    paddingHorizontal: 15,
    paddingTop: 8,
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonVer: {    
    height: 25,
    width: 50,
    paddingLeft: 15,
    paddingTop: 7,
  },
  textVer: {
    color: '#FF9B00', 
    fontSize: 16,
  },
});

export default Post;
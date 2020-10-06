import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function PetButton(props) {   
  const {name, action} = props;
  return(
    <TouchableOpacity 
      style={styles.button}
      onPress={action}
    >
      <Text style={styles.textBtn}>{name}</Text>
    </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 300,       
    backgroundColor: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  textBtn: {
    paddingLeft: 15,
    color: '#515151',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
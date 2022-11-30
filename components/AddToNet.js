import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput, Button } from 'react-native';

const AddToNet=(props)=>{
    const [newFish, setFish]=useState('');

    const fishBreedInputHandler=(enteredText)=>{
        setFish(enteredText);
    };

    const cancelFish=()=>{
        props.onCancelFish();
    }

    async function addData() {
        console.log("adding... " + newFish);
        const response = await fetch("http://10.0.2.2:8080/rest/fishservice/addfish",
        {
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({breed:newFish})
        });
        const responseData = await response.json();

        props.onAddFish();
    }

return(
    <Modal visible={props.visibility} animationType="slide">
    <View style={styles.formStyle}>
        <TextInput placeholder='Fish breed' style={styles.inputStyle} onChangeText={fishBreedInputHandler} />
        <View style={styles.buttonViewStyle}>
            <Button title='Cancel' onPress={cancelFish} />
            <Button title='Add' onPress={addData} />
        </View>
    </View>
    </Modal>
);
}

const styles=StyleSheet.create({
    inputStyle: {
      borderWidth: 2,
      borderColor: 'blue',
      padding: 10,
      width: '80%',
    },
    formStyle:{
        padding:10,
        marginTop:10,
    },
    buttonViewStyle:{
        width:'80%',
        marginTop:20,
    },
});

export default AddToNet;
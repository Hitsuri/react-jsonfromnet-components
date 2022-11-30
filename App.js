import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Alert, ActivityIndicator, Button, TouchableOpacity } from 'react-native';

import ShowFromNet from './components/ShowFromNet';
import AddtoNet from "./components/AddToNet";
import AddToNet from "./components/AddToNet";

const App = () => {
  const [fishList, setFishList] = useState([]);
  const [isLoading, setLoading]=useState(true);
  const [isVisible, setVisibility]=useState(false);
  //
  const addFishToList=()=>{
    fetchFish();
    setVisibility(false);
  }
  //
  const cancelFishToList=()=>{
    setVisibility(false);
  }
  
  async function fetchFish(){
    await fetch("http://10.0.2.2:8080/rest/fishservice/readfish")
    .then(parameter=>parameter.json())
    .then(anotherParameter=>setFishList(anotherParameter));
  }
  //
  useEffect(() => {
      if (isLoading==true){
      setLoading(false);
      fetchFish();
    }
  });
  //
  if (isLoading==true) {
    return (
      <View style={{flex: 1, padding: 20, justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  else{
    return (
      <View style={styles.screen}>

        <TouchableOpacity onPress={()=>setVisibility(true)}>
          <Text>Add Fish</Text>
        </TouchableOpacity>

        <View>
        <AddToNet visibility={isVisible} onAddFish={addFishToList} onCancelFish={cancelFishToList} />
        </View>
        
        <ShowFromNet fishList={fishList} fetchFish={fetchFish} />

      </View>
    );
  }
};

const styles=StyleSheet.create({
  screen:{
    padding:10,
    marginTop:50,
  },
});

export default App;
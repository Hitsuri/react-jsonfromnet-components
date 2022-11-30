import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

const ShowFromNet=(props)=>{

  const deleteItem=async(id)=>{
    const response = await fetch("http://10.0.2.2:8080/rest/fishservice/deletefish"+id,
    {
      method:'DELETE'
    });
    fetchFish();
  }
return(
  <View>
    <FlatList
      data={props.fishList}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <TouchableOpacity onLongPress={()=>deleteItem(item.id)}>
              <Text>{item.id}) {item.breed}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
    />
  </View>
);
}

const styles=StyleSheet.create({
  listItem:{
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#0f0',
    backgroundColor: '#fce',    
  },
});

export default ShowFromNet;
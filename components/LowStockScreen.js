import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const LowStockScreen = (props) => {
    const {lowStockValue,setLowStockValue} = props;
    const [value, setvalue] = useState(null)

    const handleLowStock = ()=>{
        if(value===null) return Alert.alert("Field cant be empty");
        setLowStockValue(value);
        setvalue(null);
    }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Set Low Stock Value</Text>
       <TextInput
            placeholder="Enter Low Stock Value"
            style={styles.input}
            value={value}
            onChangeText={setvalue}
            />
        <Pressable
         style={styles.button} onPress={()=>handleLowStock()}>
            <Text style={styles.btnText}>Change</Text>
        </Pressable>
        <Text style={styles.currentText}>Current Value: {lowStockValue}</Text>
    </View>
  )
}

export default LowStockScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:"4%",
        gap:10,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    headingText:{
        fontSize:20,
        fontWeight:500,
    },
    input:{
        borderWidth:1,
        borderColor:"black",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:7
    },
    button:{
        backgroundColor:"purple",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:7,
        justifyContent:"center",
        alignItems:"center"
    },
    btnText:{
        color:"white",
        fontWeight:600,
        fontSize:15
    },
    currentText:{
        fontSize:17,
        fontWeight:400
    }
})
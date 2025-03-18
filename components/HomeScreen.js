import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import Allitems from './Allitems'
import CreateScreen from './CreateScreen'
import shopItems from '../data/shopdata';
import LowStockScreen from './LowStockScreen';


const HomeScreen = () => {
    const [view, setview] = useState(0);
    const [data, setdata] = useState(shopItems);
    const [lowStockValue, setlowStockValue] = useState(10);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DashBoard</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button,view===0?{backgroundColor:"green"}:null]} onPress={()=>setview(0)}>
            <Text style={[styles.btnText,view===0?{color:"white"}:null]}>All Items</Text>
        </Pressable>
        <Pressable style={[styles.button,view===1?{backgroundColor:"green"}:null]} onPress={()=>setview(1)}>
            <Text style={[styles.btnText,view===1?{color:"white"}:null]}>Low Stock Items</Text>
        </Pressable>
        <Pressable style={[styles.button,view===2?{backgroundColor:"green"}:null]} onPress={()=>setview(2)}>
            <Text style={[styles.btnText,view===2?{color:"white"}:null]}>Create Item</Text>
        </Pressable>
        <Pressable style={[styles.button,view===3?{backgroundColor:"green"}:null]} onPress={()=>setview(3)}>
            <Text style={[styles.btnText,view===3?{color:"white"}:null]}>Low Stock Value</Text>
        </Pressable>
      </View>
      {view==0 && <Allitems data={data} lowStockValue={lowStockValue}/>}
      {view==1 && <Allitems data={data.filter((item)=>item.stock<lowStockValue)} lowStockValue={lowStockValue}/>}
      {view==2 && <CreateScreen data={data} setdata={setdata} lowStockValue={lowStockValue}/>}
      {view==3 && <LowStockScreen setLowStockValue={setlowStockValue} lowStockValue={lowStockValue}/>}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        padding:"4%",
        backgroundColor:"#ffffff"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:"#333"
    },
    buttonContainer:{
        flexDirection:"row",
        gap:5,
        marginVertical:10
    },
    button:{
        paddingHorizontal:10,
        paddingVertical:3.5,
        borderRadius:50,
        borderWidth:1,
        borderColor:"green"
    },
    btnText:{
        color:"green",
        fontSize:12
    }
})
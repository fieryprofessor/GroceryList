import { Pressable, StyleSheet, Text, TextInput, View, FlatList, Alert } from 'react-native'
import { useState } from 'react'

const CreateScreen = (props) => {
    const {data ,setdata, lowStockValue} = props;
    const [itemName, setitemName] = useState("")
    const [stockAmt, setstockAmt] = useState("")
    const [isEdit, setisEdit] = useState(false)
    const [editItemID, seteditItemID] = useState(null)
    const [highlightedItem1, setHighlightedItem1] = useState(null);
    const [highlightedItem2, setHighlightedItem2] = useState(null);
    let AddButtonText = !isEdit?"Add Item":"Edit Item";

    const addItemHandler = ()=>{
      if (!itemName.trim()) {
        return Alert.alert("Invalid Input", "Item name cannot be empty.");
      }
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(itemName)) {
          return Alert.alert("Invalid Item Name", "Item name should contain only letters.");
      }
    
      if (!stockAmt.trim() || isNaN(stockAmt) || Number(stockAmt) < 0) {
        return Alert.alert("Invalid Input", "Stock amount must be a valid positive number.");
      }
      const newItem = {
        id: Date.now().toString(),
        name: itemName,
        stock: stockAmt,
        unit:"kg"
      }
      setisEdit(false);
      setdata((prevData) => [...prevData, newItem]);
      setitemName("");
      setstockAmt("");
    };

    const deleteitemHandler = (id)=>{
      setdata(data.filter((item)=> item.id!==id))
    };

    const editItemHandler = (item) =>{
        setisEdit(true);
        setitemName(item.name);
        setstockAmt(String(item.stock));
        seteditItemID(item.id);
    };

    const updateItemHandler = ()=>{
      if (!itemName.trim()) {
        return Alert.alert("Invalid Input", "Item name cannot be empty.");
      }
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(itemName)) {
          return Alert.alert("Invalid Item Name", "Item name should contain only letters.");
      }
    
      if (!stockAmt.trim() || isNaN(stockAmt) || Number(stockAmt) < 0) {
        return Alert.alert("Invalid Input", "Stock amount must be a valid positive number.");
      }
      setdata(data.map((item)=>(
        item.id===editItemID?{...item, name:itemName, stock:stockAmt}:item
      )))
      setisEdit(false);
      setitemName("");
      setstockAmt("");
    };

  return (
    <View style={styles.container}>
      <TextInput
      placeholder="Enter item name"
      style={styles.input}
      value={itemName}
      onChangeText={setitemName}
      />
      <TextInput
      placeholder="Enter available stock"
      style={styles.input}
      value={stockAmt}
      onChangeText={setstockAmt}
      />

      <Pressable style={styles.button} onPress={()=>isEdit?updateItemHandler():addItemHandler()}>
        <Text style={styles.btnText}>{AddButtonText}</Text>
      </Pressable>

     <View style={styles.headingContainer}>
          <Text style={styles.headingText}>All Items in the Stock</Text>
      </View>
          <FlatList 
          data={data}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>(
            <View style={[styles.itemContainer,{backgroundColor: item.stock<lowStockValue?"#ffcccc":"#d7f6bfff"}]}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.stock}</Text>
                <Text style={styles.itemText}>{item.unit}</Text>
                <View style={{flexDirection:"row"}}>
                  <Pressable onPress={()=>{editItemHandler(item)}}
                      onPressIn={() => setHighlightedItem1(item.id)}
                      onPressOut={() => setHighlightedItem1(null)}
                      style={[
                        styles.itemButton, 
                        { backgroundColor: highlightedItem1 === item.id ? "#289fec" : "transparent" ,
                          borderRadius:50
                        }
                      ]}
                    >
                  <Text style={styles.itemText}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={()=>deleteitemHandler(item.id)}
                       onPressIn={() => setHighlightedItem2(item.id)}
                       onPressOut={() => setHighlightedItem2(null)}
                       style={[
                         styles.itemButton, 
                         { backgroundColor: highlightedItem2 === item.id ? "#ec2860" : "transparent" ,
                           borderRadius:50
                         }
                       ]}
                    >
                  <Text style={styles.itemText}>Delete</Text>
                  </Pressable>
                </View>
            </View>
        )}
        contentContainerStyle={{gap:5}}
          />

    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:"4%",
        gap:10
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
    headingContainer:{
        flexDirection:"row",
        // justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:10,
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"#f0e1b7",
        marginTop:10,
        marginBottom:5,
        justifyContent:"center",
        alignItems:"center"
    },
    headingText:{
        width: 176,
        fontWeight:700,
        fontSize:18,
    },
    itemContainer:{
        flexDirection:"row",
        // justifyContent:"space-between",
        paddingVertical:10,
        borderWidth:1,
        borderColor:"black"
    },
    itemText:{
        width:75,
        fontWeight:400,
        fontSize:14,
        padding:5,
        textAlign:"center"
    }
   
})
import { FlatList, StyleSheet, Text, View, Pressable} from 'react-native'
import { useState } from 'react';

const Allitems = (props) => {
    const {data,lowStockValue} = props;
    const [selectedItem, setSelectedItem] = useState(null);
  return (
    <Pressable style={{ flex: 1 }} onPress={() => setSelectedItem(null)}>
    <View>
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>Item</Text>
      <Text style={styles.headingText}>Quantity</Text>
      <Text style={styles.headingText}>Unit</Text>
    </View>
      <FlatList 
      data={data}
      keyExtractor={(item)=>item.id}
      renderItem={({ item }) => {
        
        let bgColor = item.stock < lowStockValue ? "#ffcccc" : "#d7f6bfff";
        if (selectedItem === item.id) {
            bgColor = "#add8e6"; 
        }

        return (
            <Pressable onPress={() => setSelectedItem(item.id)}>
                <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.stock}</Text>
                    <Text style={styles.itemText}>{item.unit}</Text>
                </View>
            </Pressable>
        );
    }}
    contentContainerStyle={{gap:5}}
      />
    </View>
    </Pressable>
  )
}

export default Allitems

const styles = StyleSheet.create({
    headingContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:10,
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"#f0e1b7",
        marginVertical:5
    },
    headingText:{
        width: 100,
        fontWeight:700,
        fontSize:18,
        textAlign:"center",
    },
    itemContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:10,
        borderWidth:1,
        borderColor:"black"
    },
    itemText:{
        width:100,
        fontWeight:400,
        fontSize:14,
        textAlign:"center",
    }
})
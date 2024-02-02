import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Home = () => {
    
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})
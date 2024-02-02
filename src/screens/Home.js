import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Home = () => {

    const [animals, setAnimals] = useState({})
    const [loading, setLoading] = useState(true)

    const getAnimals = async () => {

        fetch('https://some-random-api.ml/animal/bird')
            .then(res => res.json())
            .then(response => {
                setAnimals(response)
                setLoading(false)
            });
    }

    useEffect(() => {
        getAnimals()
    }, [])


    return (
        <View style={styles.container}>
            {
                loading === true
                    ?
                    <Text>Cargando...</Text>
                    :
                    <View>
                        <Text>Hola</Text>
                    </View>
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
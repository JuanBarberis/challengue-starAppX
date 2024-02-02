import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'

const Home = () => {

    const animalsArrays = ['bird', 'cat', 'dog', 'kangaroo', 'koala', 'raccoon', 'red_panda']
    const [animals, setAnimals] = useState({})
    const [currentAnimal, setCurrentAnimal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    //Esta funcion realiza la consulta a la api de animales
    const getAnimals = async (animal) => {
        fetch(`https://some-random-api.ml/animal/${animal}`)
            .then(res => res.json())
            .then(response => {
                setAnimals(response)
                setLoading(false)
                setError(false)
            })
            .catch((e) => {
                setError(true)
                setLoading(false)
            })
    }

    const nextAnimal = () => {
        setLoading(true)
        // Incrementa el índice del animal actual
        setCurrentAnimal(currentAnimal === animalsArrays.length - 1 ? 0 : currentAnimal + 1);
        // Llama a la función para obtener el siguiente animal
        getAnimals(animalsArrays[currentAnimal === animalsArrays.length - 1 ? 0 : currentAnimal + 1]);
    }

    //Inicializamos el componente
    useEffect(() => {
        getAnimals(animalsArrays[currentAnimal])
    }, [])

    return (
        <View style={styles.container}>
            {
                loading === true
                    ?
                    <Text>Loading...</Text>
                    :
                    error === true
                        ?
                        <View>
                            <Text>Error !</Text>
                            <Button
                                onPress={nextAnimal}
                                title='RETRY'
                            />
                        </View>

                        :
                        <View style={styles.card}>
                            <Text style={styles.title}>{animalsArrays[currentAnimal]}</Text>
                            <Image
                                source={{ uri: animals.image }}
                                style={styles.image}
                            />
                            <Text style={styles.fact}>{animals.fact}</Text>
                            <TouchableOpacity style={styles.button} onPress={nextAnimal}>
                                <Text style={styles.textbutton}>NEXT ANIMAL</Text>
                            </TouchableOpacity>
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
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    image: {
        height: 300,
        width: '100%'
    },
    card: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    fact: {
        textAlign: 'center',
        padding: 10,
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: 'blue',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textbutton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})
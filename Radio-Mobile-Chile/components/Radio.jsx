import React, { useEffect } from "react"
import { Text, View, Image, Button } from "react-native"
import { Audio } from "expo-av";

const Radio = ({ data, iterador, soundRef }) => {
    if (!data || data.length === 0) {
        return <Text>Cargando...</Text>
    }

    const elemento = data[iterador]

    const handlePlay = async () => {
        if (soundRef.current) {
            return // Ya se está reproduciendo un sonido
        }
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: elemento.stream },
                { shouldPlay: true }
            );
            soundRef.current = sound // Guarda el sonido en soundRef
        } catch (error) {
            console.error("Error al reproducir el audio:", error)
        }
    };

    const handlePause = async () => {
        if (soundRef.current) {
            await soundRef.current.pauseAsync()
            soundRef.current = null
        }
    };

    useEffect(() => {
        handlePlay()
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync()
                soundRef.current = null
            }
        }
    }, [iterador])

    return (
        <View key={elemento.name}>
            <View>
                <Image
                    source={{ uri: elemento.image[200] }}
                    className="w-32 h-32 rounded-full"
                    resizeMode="cover"
                />
            </View>
            <Text>{elemento.name}</Text>
            <Button title="Play" onPress={handlePlay} />
            <Button title="Pause" onPress={handlePause} />
        </View>
    )
}

export default Radio
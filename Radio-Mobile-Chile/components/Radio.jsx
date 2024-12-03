import React, { useEffect, useState } from "react";
import { Text, View, Image,Button } from "react-native";
import { Audio } from "expo-av";

const Radio = ({ data, iterador }) => {
    if (!data || data.length === 0) {
        return <Text>Cargando...</Text>
    }
    const [sound, setSound] = useState(null)
    const elemento = data[iterador]

    const handlePlay = async () => {
        if (sound ) {
            return
        }
        try {
            
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: elemento.stream },
                { shouldPlay: true }
            );
            setSound(newSound)
        } catch (error) {
            console.error("Error al reproducir el audio:", error)
        }
    }

    useEffect(() => {
        if (elemento && elemento.stream) {
            handlePlay()
        }
        
        return () => {
            if (sound) {
                sound.unloadAsync()
            }
        }
    }, [iterador])

    const handlePause = async () => {
        if (sound) {
            await sound.pauseAsync()
            setSound(null)
        }
    }

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
    );
};

export default Radio;
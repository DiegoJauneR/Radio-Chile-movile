import React, { useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Audio } from "expo-av";

const Radio = ({ data, iterador, soundRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const elemento = data[iterador];

  const handlePlay = async () => {
    if (soundRef.current) {
      return; // Ya se está reproduciendo un sonido
    }
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: elemento.stream },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setIsPlaying(true);
    } catch (error) {
      console.error("Error al reproducir el audio:", error);
    }
  };

  const handlePause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      soundRef.current = null;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    handlePlay();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlaying(false);
      }
    };
  }, [iterador]);

  if (!data || data.length === 0 || !elemento) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View
      key={elemento.name}
      className=" flex justify-center content-center items-center gap-y-3"
    >
      <View>
        <Image
          source={{ uri: elemento.image[200] }}
          className="w-32 h-32 rounded-full"
          resizeMode="cover"
        />
      </View>
      <Text className="text-white mb-4 text-xl font-bold ">
        {elemento.name}
      </Text>
      <Text
        onPress={() => Linking.openURL(elemento.url)}
        className="text-green-600 text-mb-4"
      >
        {elemento.name}
      </Text>
      <TouchableOpacity
        onPress={isPlaying ? handlePause : handlePlay}
        className="bg-white py-2 px-4 rounded-full border w-[40] h-[40] justify-center "
      >
        <Text className="text-white font-bold text-center ">
          {isPlaying ? (
            <FontAwesome6 name="pause" size={10} color="black" />
          ) : (
            <FontAwesome6 name="play" size={10} color="black" />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Radio;

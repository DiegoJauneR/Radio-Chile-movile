import React, { useState, useEffect, useRef } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import Radio from "../../components/Radio";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [styleBuscar, setStyleBuscar] = useState(
    "w-[242] max-h-[300] bg-[#000000b8] text-white border-hidden absolute overflow-hidden top-[58] z-20 border rounded-3xl border-green-600 p-2"
  );
  const [iterador, setIterador] = useState(2);
  const soundRef = useRef(null); // Para manejar el sonido desde HomeScreen
  const [radiosFiltradas, setRadiosFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState();

  useEffect(() => {
    const url = "https://api.boostr.cl/radios.json";
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error("error:" + err));
  }, []);

  const filtrarBusqueda = (value) => {
    setBusqueda(value);

    const resultadosFiltrados = data.filter((radio) =>
      radio.name.toLowerCase().includes(value.toLowerCase())
    );
    setRadiosFiltradas(resultadosFiltrados);
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      soundRef.current = null;
    }
  };

  const siguienteRadio = async () => {
    await stopSound(); // Detener el sonido antes de avanzar
    if (iterador === data.length - 1) {
      setIterador(0);
    } else {
      setIterador(iterador + 1);
    }
  };

  const anteriorRadio = async () => {
    await stopSound(); // Detener el sonido antes de retroceder
    if (iterador === 0) {
      setIterador(data.length - 1);
    } else {
      setIterador(iterador - 1);
    }
  };

  const buscarRadio = () => {
    const iterador2 = (elemento) => elemento.name === busqueda;
    const iteradorBuscado = data.findIndex(iterador2);
    if (iteradorBuscado === -1) return;
    setIterador(iteradorBuscado);
    setStyleBuscar(
      "w-[242] max-h-[300] bg-[#000000b8] text-white border-hidden absolute overflow-hidden top-[58] z-20 border rounded-3xl border-green-600 p-2"
    );
    setBusqueda();
  };

  const rellenarBusqueda = (nombreRadio) => {
    setRadiosFiltradas([]);
    setBusqueda(nombreRadio);
    setStyleBuscar("hidden");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://radios-chile.netlify.app/assets/fondo-BqauMuYs.webp",
      }}
      resizeMode="cover"
      className="flex-1 brightness-60"
    >
      <Image
        source={{
          uri: "https://res.cloudinary.com/doq82xcpd/image/upload/v1728602094/titulo_ekqc6e.webp",
        }}
        className="absolute top-[58px] ml-10 mt-9"
        style={{ width: 300, height: 65 }}
      />

      <View className="flex justify-center items-center h-screen">
        <View className="flex-row justify-center w-2/4 mb-5 ">
          <TextInput
            onChangeText={filtrarBusqueda}
            value={busqueda}
            placeholder="Buscar Radio"
            placeholderTextColor="white"
            className="border text-white  border-gray-300 rounded-2xl p-2 w-3/4 mr-1"
          />

          {busqueda && (
            <View className={styleBuscar}>
              {radiosFiltradas.map((radio, index) => (
                <View key={index} className="mb-2">
                  <TouchableOpacity
                    onPress={() => rellenarBusqueda(radio.name)}
                  >
                    <Text className="text-white text-center mb-3 ">
                      {radio.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity onPress={buscarRadio}>
            <Text className="border border-green-600  text-green-600 px-6 py-2 rounded-3xl">
              {"Buscar"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-64  content-center bg-[#090909d6] p-10 border rounded-3xl">
          <Radio data={data} iterador={iterador} soundRef={soundRef} />

          <View className="absolute left-[45] bottom-11">
            <View className="flex flex-row mt-4 space-x-4 justify-around gap-9 ">
              <TouchableOpacity onPress={anteriorRadio}>
                <Text className=" text-white px-4 py-2 rounded">
                  <FontAwesome6 name="arrow-left" size={14} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity></TouchableOpacity>
              <TouchableOpacity onPress={siguienteRadio}>
                <Text className=" text-white px-4 py-2 rounded">
                  <FontAwesome6 name="arrow-right" size={14} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

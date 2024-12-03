import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import Radio from "../../components/Radio";

export default function HomeScreen() {
    const [data, setData] = useState([]);
    const [iterador, setIterador] = useState(2);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const url = "https://api.boostr.cl/radios.json";
        const options = { method: "GET", headers: { accept: "application/json" } };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setData(json.data))
            .catch((err) => console.error("error:" + err));
    }, []);

    const siguienteRadio = () => {
      if(iterador === data.length-1) {
        setIsPlaying(true)
        setIterador(0)
        return
      }
      setIsPlaying(true)
      setIterador(iterador+1)
    }
  
    const anteriorRadio = () => {
      if(iterador === 0) {
        setIterador(data.length-1)
        setIsPlaying(true)
        return
      }
      setIsPlaying(true)
      setIterador(iterador-1)
    }

    return (
        <View>
            <Radio data={data} iterador={iterador} />
            <Button title="->" onPress={siguienteRadio}></Button>
            <Button title="<-" onPress={anteriorRadio}></Button>
        </View>
    );
}

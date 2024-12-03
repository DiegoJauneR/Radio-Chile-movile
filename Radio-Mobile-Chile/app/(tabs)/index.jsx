import React, { useState, useEffect, useRef } from "react"
import { Button, View } from "react-native"
import Radio from "../../components/Radio"

export default function HomeScreen() {
    const [data, setData] = useState([])
    const [iterador, setIterador] = useState(2)
    const soundRef = useRef(null); // Para manejar el sonido desde HomeScreen

    useEffect(() => {
        const url = "https://api.boostr.cl/radios.json";
        const options = { method: "GET", headers: { accept: "application/json" } }

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setData(json.data))
            .catch((err) => console.error("error:" + err))
    }, []);

    const stopSound = async () => {
        if (soundRef.current) {
            await soundRef.current.pauseAsync()
            soundRef.current = null
        }
    };

    const siguienteRadio = async () => {
        await stopSound(); // Detener el sonido antes de avanzar
        if (iterador === data.length - 1) {
            setIterador(0)
        } else {
            setIterador(iterador + 1)
        }
    };

    const anteriorRadio = async () => {
        await stopSound(); // Detener el sonido antes de retroceder
        if (iterador === 0) {
            setIterador(data.length - 1)
        } else {
            setIterador(iterador - 1)
        }
    }

    return (
        <View>
            <Radio data={data} iterador={iterador} soundRef={soundRef} />
            <Button title="->" onPress={siguienteRadio}></Button>
            <Button title="<-" onPress={anteriorRadio}></Button>
        </View>
    )
}

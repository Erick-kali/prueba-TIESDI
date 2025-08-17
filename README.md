# Personas App

Una aplicación de ejemplo creada con Expo y React Native para gestionar personas, con foto, nombre y apellido. Incluye almacenamiento persistente en el dispositivo y una interfaz moderna.

## Características

- CRUD de personas (crear, editar, eliminar)
- Selección y eliminación de foto para cada persona
- Almacenamiento persistente local usando AsyncStorage
- Interfaz moderna y responsiva
- Animaciones suaves con react-native-reanimated

## Instalación

1. **Clona el repositorio o puede copiar los archivos en una carpeta nueva**
2. Instala las dependencias:
    ```sh
    npm install
    npx expo install react-native-reanimated @react-native-async-storage/async-storage expo-image-picker @expo/vector-icons
    ```
3. Inicia el proyecto:
    ```sh
    npm start
    ```
4. Escanea el QR con Expo Go en tu dispositivo.

## Estructura del proyecto

```
components/
  PersonModal.tsx     # Modal para crear/editar personas
storage/
  personStorage.ts    # Lógica de almacenamiento en AsyncStorage
app/
  (tabs)/
    index.tsx         # Pantalla principal (Lista y CRUD de personas)
```

## Personalización

- Puedes cambiar los estilos en los archivos `PersonModal.tsx` e `index.tsx`.
- El almacenamiento es local; si deseas almacenamiento en la nube, deberías cambiar `personStorage.ts`.

## Dependencias principales

- [expo](https://expo.dev/)
- [react-native-reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
- [@react-native-async-storage/async-storage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/)
- 
## preguntas y respuestas acerca de la prueba tecnica
##¿Cuál es la diferencia principal entre React Native y ReactJS?
La diferencia principal es que ReactJS se usa para aplicaciones web y trabaja con HTML y el DOM del navegador, 
mientras que React Native está enfocado en aplicaciones móviles nativas y utiliza componentes propios que se traducen en elementos nativos de iOS o Android. Básicamente, 
ReactJS se queda en la web y React Native permite llegar a dispositivos móviles con una experiencia más cercana a una app nativa.

##Explique cómo funciona el ciclo de vida de un componente en React Native.
El ciclo de vida de un componente en React Native es similar al de React, se divide en fases: montaje, actualización y desmontaje. 
En el montaje se crea el componente y se ejecuta componentDidMount, en la actualización se vuelve a renderizar si cambian las props o el estado, 
y en el desmontaje se limpia con componentWillUnmount. Con los hooks como useEffect, 
se manejan estas fases de una forma más sencilla y práctica.

¿Qué es AsyncStorage y en qué casos es recomendable usarlo?
AsyncStorage es una API que permite guardar datos de manera local en el dispositivo, como si fuera una base de datos pequeña en clave-valor. 
Es recomendable usarlo cuando se necesita guardar información sencilla y persistente como tokens de sesión, 
configuraciones de usuario o datos que deben mantenerse aunque la app se cierre.

¿Cuál es la diferencia entre usar FlatList y ScrollView en React Native?
La diferencia es que ScrollView renderiza todos los elementos de una lista en memoria, lo cual puede generar problemas de rendimiento con muchos datos. 
En cambio, FlatList es más eficiente porque solo renderiza lo que se ve en pantalla y va cargando los demás elementos conforme se hace scroll. 
Por eso, FlatList es la opción adecuada para listas largas.
## Créditos

Creado por [Erick-kali] Stanley Arce M..

---

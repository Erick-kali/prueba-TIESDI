import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function PersonModal({ person, onSave, onCancel }) {
  const isEdit = !!person;
  const [nombre, setNombre] = useState(person?.nombre || "");
  const [apellido, setApellido] = useState(person?.apellido || "");
  const [photo, setPhoto] = useState(person?.photo || null);

  const handlePickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleRemovePhoto = () => setPhoto(null);

  const handleSubmit = () => {
    if (!nombre.trim() || !apellido.trim()) return;
    onSave(
      {
        ...(person || {}),
        nombre,
        apellido,
        photo,
      },
      isEdit
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Animated.View style={styles.modal} entering={FadeInDown}>
        <Text style={styles.header}>
          {isEdit ? "Editar Persona" : "Nueva Persona"}
        </Text>
        <TouchableOpacity onPress={handlePickPhoto} style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={{ color: "#888" }}>Agregar Foto</Text>
            </View>
          )}
        </TouchableOpacity>
        {photo && (
          <TouchableOpacity style={styles.removePhoto} onPress={handleRemovePhoto}>
            <Text style={{ color: "#e53935" }}>Eliminar foto</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
            <Text style={{ color: "#1976d2" }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
            <Text style={{ color: "#fff" }}>
              {isEdit ? "Guardar" : "Agregar"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0008",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 18,
    color: "#222",
  },
  photoContainer: {
    alignSelf: "center",
    marginBottom: 12,
  },
  photo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#eee",
  },
  photoPlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  removePhoto: {
    alignSelf: "center",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f4f6fb",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 10,
  },
  btnCancel: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#e3eaff",
    marginRight: 8,
  },
  btnSave: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#1976d2",
  },
});
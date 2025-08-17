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
import { Person } from "../app/storage/personStorage";

interface Props {
  person: Person | null;
  onSave: (person: Person, isEdit: boolean) => void;
  onCancel: () => void;
}

export default function PersonModal({ person, onSave, onCancel }: Props) {
  const isEdit = !!person;
  const [nombre, setNombre] = useState(person?.nombre || "");
  const [apellido, setApellido] = useState(person?.apellido || "");
  const [photo, setPhoto] = useState<string | undefined>(person?.photo);

  const handlePickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleRemovePhoto = () => setPhoto(undefined);

  const handleSubmit = () => {
    if (!nombre.trim() || !apellido.trim()) return;
    onSave(
      {
        ...(person || {}),
        nombre,
        apellido,
        photo,
        id: person?.id ?? Date.now().toString(),
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
            <Text style={{ color: "#e53935", fontSize: 13 }}>Eliminar foto</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#b0b8c1"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#b0b8c1"
          value={apellido}
          onChangeText={setApellido}
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
            <Text style={{ color: "#1976d2", fontWeight: "bold" }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
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
    width: "94%",
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 26,
    elevation: 20,
    shadowColor: "#222",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 16,
    color: "#222",
    letterSpacing: 0.5,
  },
  photoContainer: {
    alignSelf: "center",
    marginBottom: 12,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#eee",
    borderWidth: 2,
    borderColor: "#b3e5fc",
  },
  photoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f0f4fa",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#cfd8dc",
  },
  removePhoto: {
    alignSelf: "center",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f7fafd",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    marginBottom: 13,
    borderWidth: 1.3,
    borderColor: "#dde2e7",
    color: "#263238",
    shadowColor: "#e3f2fd",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20, // Subido el botón más arriba
  },
  btnCancel: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: "#e3eaff",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#b0b8c1",
  },
  btnSave: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: "#1976d2",
    shadowColor: "#1976d2",
    shadowOpacity: 0.17,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
});
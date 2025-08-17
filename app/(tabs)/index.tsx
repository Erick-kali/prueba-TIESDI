import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, Modal, Image, View, SafeAreaView } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import PersonModal from "../../components/PersonModal";
import { getPersons, savePersons, Person } from "../storage/personStorage";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function HomeScreen() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getPersons();
      setPersons(data);
    })();
  }, []);

  const openModal = (person: Person | null = null) => {
    setSelectedPerson(person);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPerson(null);
    setModalVisible(false);
  };

  const handleSave = async (person: Person, isEdit: boolean) => {
    let updatedPersons: Person[];
    if (isEdit) {
      updatedPersons = persons.map((p) => (p.id === person.id ? person : p));
    } else {
      updatedPersons = [{ ...person, id: Date.now().toString() }, ...persons];
    }
    setPersons(updatedPersons);
    await savePersons(updatedPersons);
    closeModal();
  };

  const handleDelete = async (id: string) => {
    const updatedPersons = persons.filter((p) => p.id !== id);
    setPersons(updatedPersons);
    await savePersons(updatedPersons);
  };

  const handleDeletePhoto = async (id: string) => {
    const updatedPersons = persons.map((p) =>
      p.id === id ? { ...p, photo: undefined } : p
    );
    setPersons(updatedPersons);
    await savePersons(updatedPersons);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personas</Text>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.floatingList}
      >
        <FlatList
          data={persons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <View style={styles.card}>
                <TouchableOpacity onPress={() => openModal(item)}>
                  {item.photo ? (
                    <Image source={{ uri: item.photo }} style={styles.photo} />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <AntDesign name="user" size={32} color="#bbb" />
                    </View>
                  )}
                </TouchableOpacity>
                <View style={styles.info}>
                  <Text style={styles.name}>
                    {item.nombre} {item.apellido}
                  </Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => openModal(item)}
                      style={styles.iconBtn}
                    >
                      <AntDesign name="edit" size={22} color="#1976d2" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      style={styles.iconBtn}
                    >
                      <MaterialIcons name="delete" size={22} color="#e53935" />
                    </TouchableOpacity>
                    {item.photo && (
                      <TouchableOpacity
                        onPress={() => handleDeletePhoto(item.id)}
                        style={styles.iconBtn}
                      >
                        <MaterialIcons name="image-not-supported" size={22} color="#fbc02d" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </Animated.View>
          )}
        />
      </Animated.View>
      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <AntDesign name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <PersonModal
          person={selectedPerson}
          onSave={handleSave}
          onCancel={closeModal}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 24,
    color: "#222",
  },
  floatingList: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 18,
    borderRadius: 24,
    padding: 8,
    elevation: 7,
    shadowColor: "#333",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 12,
    backgroundColor: "#fafbff",
    borderRadius: 18,
    elevation: 2,
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
    backgroundColor: "#eee",
  },
  photoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "600", color: "#263238" },
  actions: { flexDirection: "row", marginTop: 8 },
  iconBtn: { marginHorizontal: 7 },
  fab: {
    position: "absolute",
    bottom: 90, 
    right: 36,
    backgroundColor: "#1976d2",
    borderRadius: 40,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});
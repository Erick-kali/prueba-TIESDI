import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "PERSONS_LIST";

export async function getPersons() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
}

export async function savePersons(persons) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(persons));
  } catch (e) {}
}
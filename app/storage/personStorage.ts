import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Person {
  id: string;
  nombre: string;
  apellido: string;
  photo?: string;
}

const KEY = "PERSONS_LIST";

export async function getPersons(): Promise<Person[]> {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    return [];
  }
}

export async function savePersons(persons: Person[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(persons));
  } catch (e) {}
}
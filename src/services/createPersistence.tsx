import RNAsyncStorage from "@react-native-async-storage/async-storage";

export function createPersistence(AsyncStorage = RNAsyncStorage) {
  return {
    async get(key: string) {
      const valueString = await AsyncStorage.getItem(key);
      if (valueString === null) return undefined;
      try {
        const value = JSON.parse(valueString);
        return value;
      } catch (error) {
        console.log(
          "error parsing JSON from persistence for key",
          key,
          " value ",
          valueString
        );
        return undefined;
      }
    },

    async set(key: string, value: any) {
      if (value === undefined) return AsyncStorage.removeItem(key);
      const valueString = JSON.stringify(value);
      return AsyncStorage.setItem(key, valueString);
    },

    async clear(key: string) {
      return AsyncStorage.removeItem(key);
    },
  };
}

export interface PersistenceStatic
  extends ReturnType<typeof createPersistence> {}

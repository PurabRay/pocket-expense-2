import { Platform } from 'react-native';



const webStorage = {
  setItem: async (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('localStorage setItem error', e);
      throw e;
    }
  },
  getItem: async (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('localStorage getItem error', e);
      throw e;
    }
  },
  removeItem: async (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('localStorage removeItem error', e);
      throw e;
    }
  },
};


const mobileStorage = {
  setItem: async (key, value) => console.warn('AsyncStorage not available on web build'),
  getItem: async () => null,
  removeItem: async () => console.warn('AsyncStorage not available on web build'),
};

const storage = Platform.OS === 'web' ? webStorage : mobileStorage;

export default storage;
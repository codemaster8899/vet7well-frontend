import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    darkMode: false,
    leftDrawerOpen: false,
    counter: 0,
  }),
  share: {
    enable: true,
    initialize: true,
  },
  persist: {
    storage: localStorage,
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}

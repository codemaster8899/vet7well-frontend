import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUserAuthStore = defineStore('userAuthStore', {
  state: () => {
    let ud: string | null = null;
    let uat: string | null = null;
    let mua: string | null = null;

    ud = localStorage.getItem('v7wUserData') !== null ? localStorage.getItem('v7wUserData') : null;
    uat = localStorage.getItem('v7wUserAccessToken') !== null ? localStorage.getItem('v7wUserAccessToken') : null;
    mua = localStorage.getItem('v7wUserAuthenticated') !== null ? localStorage.getItem('v7wUserAuthenticated') : null;

    return {
      v7wUserData: ud !== null ? JSON.parse(ud) : null,
      v7wUserAccessToken: uat,
      v7wUserAuthenticated: mua,
    };
  },
  actions: {
    updateTokens(payload: any) {
      if (payload.v7wUserAccessToken !== undefined) {
        this.v7wUserAccessToken = payload.v7wUserAccessToken;
        localStorage.setItem('v7wUserAccessToken', payload.v7wUserAccessToken);
      }

      if (payload.v7wUserAuthenticated !== undefined) {
        this.v7wUserAuthenticated = payload.v7wUserAuthenticated;
        localStorage.setItem('v7wUserAuthenticated', payload.v7wUserAuthenticated);
      }

      if (payload.v7wUserData !== undefined) {
        this.v7wUserData = payload.v7wUserData;
        localStorage.setItem('v7wUserData', JSON.stringify(payload.v7wUserData));
      }
    },
    logout() {
      localStorage.removeItem('v7wUserAccessToken');
      localStorage.removeItem('v7wUserAuthenticated');
      localStorage.removeItem('v7wUserData');
      this.$reset();
    },
  },
  getters: {
    getUserAuthenticated: (state) => {
      return state.v7wUserAuthenticated;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserAuthStore, import.meta.hot));
}

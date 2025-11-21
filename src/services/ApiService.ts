import { api } from 'boot/axios';
import { Loading, Notify } from 'quasar';
import { AxiosError } from 'axios'; //eslint-disable-line

export class ApiService {
  async get<T>(url: string) {
    if (!Loading.isActive) Loading.show();
    try {
      return (await api.get<T>(url)) as T;
    } catch (error: any | AxiosError) {
      console.log('Apiservice error:', error.data.Meta);
    } finally {
      Loading.hide();
    }
  }

  async post<T>(url: string, data: any) {
    if (!Loading.isActive) Loading.show();
    try {
      return (await api.post<T>(url, data)) as T;
    } catch (error: any | AxiosError) {
      if (error.status === 500) {
        console.log('error 500: ', error.data.message);
        /*Notify.create({
          message: error.data.message,
          color: 'red',
          position: 'top',
          icon: 'fa-solid fa-exclamation-triangle',
        });*/
      }
      console.log('post error: ', error);
    } finally {
      Loading.hide();
    }
  }
}

export const apiService = new ApiService();

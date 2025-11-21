import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { Dialog, Notify } from 'quasar';
import { i18n } from 'boot/i18n';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.VITE_APP_API_URL!,
  timeout: 15 * 1000,
  headers: {
    'Content-Type': 'application/json',
    'X-Bt-Api-Key': process.env.BT_API_KEY!,
    'X-Bt-Api-Secret': process.env.BT_API_SECRET!,
  },
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => handleResponse(response),
  (error) => handleError(error.response),
);

enum StatusCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
  CustomError = 488,
}

function handleResponse(response: AxiosResponse): any {
  // console.log('handleResponse: ' + JSON.stringify(response));
  if (response.status === 200) {
    if (!(response.data instanceof Object)) {
      // catch errors if there are some php outputs in the code
      try {
        const parsed = JSON.parse(response.data); //eslint-disable-line
      } catch (err) {
        console.error('parse error ' + err);
        // showError({ message: err, statusCode: 502, data: response });
      }
    }
    if (response.data.Meta.Success) {
      return response.data.Data;
    } else {
      console.log('handleResponse meta: ', response.data.Meta);
      // dont display notify message
      // every error returns false and should be handled in the calling function
      /*
      Notify.create({
        message: response.data.Meta.Message,
        color: 'red',
        position: 'top',
        icon: 'fa-solid fa-exclamation-triangle',
      });
      */
      return false;
    }
  } else {
    Notify.create({
      message: response.statusText,
      color: 'red',
      position: 'top',
      icon: 'fa-solid fa-exclamation-triangle',
    });
    throw new Error('Error: ' + response.statusText);
  }
}

function handleError(error: AxiosResponse): Promise<AxiosResponse> {
  // console.log('handleError: ', error);
  const { status } = error;
  let errorCode: number = 0;
  let errorMessage: string = '';

  if (status !== error.data.Meta?.Code) {
    errorCode = error.data.Meta?.Code;
  }

  switch (status) {
    case StatusCode.BadRequest: {
      errorMessage = error.data.Meta.Errors + ' (' + errorCode + ')';
      break;
    }
    case StatusCode.Forbidden: {
      errorMessage = '403 - Forbidden - Please login (' + errorCode + ')';
      break;
    }
    case StatusCode.Unauthorized: {
      errorMessage = 'Unauthorized - Invalid credentials (' + errorCode + ')';
      break;
    }
    case StatusCode.NotFound: {
      errorMessage = 'Endpoint not Found  (' + errorCode + ')';
      break;
    }
    case StatusCode.InternalServerError: {
      errorMessage = 'Internal Server Error (500)';
      break;
    }
    // TODO: in testing state
    case StatusCode.CustomError: {
      errorMessage = 'Custom Error: ' + error.data.Meta.Code + ' ' + error.data.Meta.Message;
      break;
    }
    default: {
      // Handle default
      errorMessage = 'Unhandled error: ' + error.statusText;
      break;
    }
  }
  Notify.create({
    message: errorMessage,
    color: 'red',
    position: 'top',
    icon: 'fa-solid fa-exclamation-triangle',
  });

  return Promise.reject(error);
}

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api };

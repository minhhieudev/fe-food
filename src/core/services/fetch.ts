import axios, { AxiosInstance } from "axios";
import { AuthRequest } from "./auth";
import CONST from "./const";
import SysStorage from "./storage";
export interface SysResponse {
  success: boolean;
  data?: any;
  message?: any;
  error?: any;
}
let AxiosClient = axios.create({
  baseURL: CONST.REQUEST.API_ADDRESS,
  timeout: CONST.REQUEST.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
let AxiosClientKWT = axios.create({
  baseURL: `${CONST.REQUEST.API_ADDRESS}/kwt`,
  timeout: CONST.REQUEST.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

const registerInterceptorsRequest = (clientInstance: AxiosInstance) => {
  clientInstance.interceptors.request.use(
    async (config: any) => {
      try {
        const atStore = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
        const accessToken = await atStore.get();
        if (accessToken && accessToken !== "underfined") {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // set guid
        const clientGuid = await localStorage.getItem('client_guid');
        if (clientGuid) {
          config.headers['client-guid'] = clientGuid;
        }

        await new Promise((resolve: any) => setTimeout(resolve, 1));
      } catch (error) {}
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

registerInterceptorsRequest(AxiosClient);
registerInterceptorsRequest(AxiosClientKWT);

const registerInterceptorResponse = (clientInstance: AxiosInstance) => {
  clientInstance.interceptors.response.use(
    (response: any) => {
      const res = response?.data || response;
      if (res?.status && res?.message) {
        if (res?.status === "error") {
        } else if (res?.status === "success") {
        }
      }
      return res;
    },
    async function (error) {
      const originalRequest = error?.config;
      if (error?.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;
        const tokenStorage = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
        const refreshTokenStorage = SysStorage(CONST.STORAGE.REFRESH_TOKEN);
        try {
          const currentRefreshToken: string =
            (await refreshTokenStorage.get()) || "";
          const { success, message, data }: any =
            await AuthRequest.refreshToken({
              currentRefreshToken: currentRefreshToken,
            });
          if (success) {
            refreshTokenStorage.set(data?.refreshToken);
            await tokenStorage.set(data?.accessToken);
            await setConfigAxios(data?.accessToken);
          } else {
            await tokenStorage.remove();
            await refreshTokenStorage.remove();
          }
          return clientInstance(originalRequest);
        } catch (error) {
          await tokenStorage.remove();
          await refreshTokenStorage.remove();
          //window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
};
registerInterceptorResponse(AxiosClient);
registerInterceptorResponse(AxiosClientKWT);

/*

AxiosClient.interceptors.request.use(
  async (config: any) => {
    try {
      const atStore = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
      const accessToken = await atStore.get();
      if (accessToken && accessToken !== "underfined") {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      await new Promise((resolve: any) => setTimeout(resolve, 1));
    } catch (error) {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (response: any) => {
    const res = response?.data || response;
    if (res?.status && res?.message) {
      if (res?.status === "error") {
      } else if (res?.status === "success") {
      }
    }
    return res;
  },
  async function (error) {
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const tokenStorage = SysStorage(CONST.STORAGE.ACCESS_TOKEN);
      const refreshTokenStorage = SysStorage(CONST.STORAGE.REFRESH_TOKEN);
      try {
        const currentRefreshToken: string =
          (await refreshTokenStorage.get()) || "";
        const { success, message, data }: any = await AuthRequest.refreshToken({
          currentRefreshToken: currentRefreshToken,
        });
        if (success) {
          refreshTokenStorage.set(data?.refreshToken);
          await tokenStorage.set(data?.accessToken);
          await setConfigAxios(data?.accessToken);
        } else {
          await tokenStorage.remove();
          await refreshTokenStorage.remove();
        }
        return AxiosClient(originalRequest);
      } catch (error) {
        await tokenStorage.remove();
        await refreshTokenStorage.remove();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
*/

const setConfigAxiosClient = (
  accessToken: any,
  clientAxiosInstance: AxiosInstance
) => {
  clientAxiosInstance.defaults.headers.common = {
    "Content-Type": "application/json",
  };
  clientAxiosInstance.defaults.timeout = CONST.REQUEST.REQUEST_TIMEOUT;
  if (accessToken) {
    clientAxiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
};

export function setConfigAxios(accessToken: any) {
  setConfigAxiosClient(accessToken, AxiosClient);
  setConfigAxiosClient(accessToken, AxiosClientKWT);
}
const post = (url: string, data?: any, config = {}) => {
  return AxiosClient.post(url, data, config);
};

const get = (url: string, config = {}) => {
  return AxiosClient.get(url, config);
};

const put = (url: string, data?: any, config = {}) => {
  return AxiosClient.put(url, data, config);
};

const patch = (url: string, data?: any, config = {}) => {
  return AxiosClient.patch(url, data, config);
};

const del = (url: string, config = {}) => {
  return AxiosClient.delete(url, config);
};
const MSTFetch = {
  post,
  get,
  put,
  patch,
  delete: del,
};

const MSTFetchKWT = {
  post: (url: string, data?: any, config = {}) => {
    return AxiosClientKWT.post(url, data, config);
  },
  get: (url: string, config = {}) => {
    return AxiosClientKWT.get(url, config);
  },
  put: (url: string, data?: any, config = {}) => {
    return AxiosClientKWT.put(url, data, config);
  },
  patch: (url: string, data?: any, config = {}) => {
    return AxiosClientKWT.put(url, data, config);
  },
  delete: (url: string, config = {}) => {
    return AxiosClientKWT.delete(url, config);
  },
};
export { MSTFetchKWT };
export default MSTFetch;

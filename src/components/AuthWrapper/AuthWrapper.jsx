import { useEffect, useLayoutEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { config } from "dotenv";

const AuthWrapper = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    (async () => {
      try {
        const personalDetails = await axiosInstance.get("auth/me");
        if (personalDetails.data.accessToken) {
          setToken(personalDetails.data.accessToken);
        } else {
          setToken(null);
        }
      } catch (error) {
        if (error.response.data.statusCode === 401) {
          setToken(null);
        }
      }
    })();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(() => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
          return config;
    });
    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(()=> {
    const refreshInterceptor = axiosInstance.interceptors.response.use((response)=> response,
    async (error)=> {
        const originalRequest = error.config;
        if(error.response.status === 403 && error.response.data.message === 'Unauthorized'){
            try {
                const response = await AudioParam.get('refreshToken');
                setToken(response.data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                originalRequest._retry = true;
                return axiosInstance(originalRequest);
            } catch (error) {
                setToken(null);
            }
        }
        return Promise.reject(error);
    }
    )

    return () => {
        axiosInstance.interceptors.request.eject(authInterceptor);
      };
  },[])
  return (
    <div>
      <h1>AuthWrapper</h1>
    </div>
  );
};

export default AuthWrapper;

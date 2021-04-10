import { AxiosError, AxiosRequestConfig } from "axios";

export interface Config {
  host: string;
  authentication: Config.Authentication;
  strictGDPR?: boolean;
  noCheckAtlassianToken?: boolean;
  baseRequestConfig?: Config.BaseRequestConfig;
  middlewares?: Config.Middlewares;
}

export namespace Config {
  export type BaseRequestConfig = AxiosRequestConfig;
  export type Error = AxiosError;

  export type Authentication = {
    email: string;
    apiKey: string;
  };

  export interface Middlewares {
    onError?: Config.Middlewares.OnErrorHandler;
    onResponse?: Config.Middlewares.OnResponseHandler;
  }

  export namespace Middlewares {
    export type OnErrorHandler = (error: Config.Error) => void;
    export type OnResponseHandler = (data: any) => void;
  }
}

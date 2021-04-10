import { AxiosError, AxiosRequestConfig } from "axios";

export type Callback<T> = (err: AxiosError | null, data?: T) => void;

export interface Client {
  sendRequest<T>(
    requestConfig: AxiosRequestConfig,
    callback?: Callback<T>
  ): Promise<void>;
}

export * from "./parameters";
export * from "./models";

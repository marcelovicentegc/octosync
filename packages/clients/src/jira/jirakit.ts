import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import type { Client, Callback } from "./types";
import type { Config } from "./config";
import { Issues, UserSearch } from "./endpoints";

const STRICT_GDPR_FLAG = "x-atlassian-force-account-id";
const ATLASSIAN_TOKEN_CHECK_FLAG = "X-Atlassian-Token";
const ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE = "no-check";

export class Jira implements Client {
  private instance: AxiosInstance;

  constructor(protected readonly config: Config) {
    this.instance = axios.create({
      paramsSerializer: this.paramSerializer.bind(this),
      ...config.baseRequestConfig,
      baseURL: config.host,
      headers: this.removeUndefinedProperties({
        [STRICT_GDPR_FLAG]: config.strictGDPR,
        [ATLASSIAN_TOKEN_CHECK_FLAG]: config.noCheckAtlassianToken
          ? ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE
          : undefined,
        ...config.baseRequestConfig?.headers,
      }),
    });
  }

  protected paramSerializer(parameters: Record<string, any>): string {
    const parts: string[] = [];

    Object.entries(parameters).forEach(([key, value]) => {
      if (value === null || typeof value === "undefined") {
        return undefined;
      }

      if (Array.isArray(value)) {
        value = value.join(",");
      }

      if (value instanceof Date) {
        value = value.toISOString();
      } else if (value !== null && typeof value === "object") {
        value = JSON.stringify(value);
      }

      parts.push(`${this.encode(key)}=${this.encode(value)}`);

      return undefined;
    });

    return parts.join("&");
  }

  protected encode(value: string) {
    return encodeURIComponent(value)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+")
      .replace(/%5B/gi, "[")
      .replace(/%5D/gi, "]");
  }

  protected removeUndefinedProperties(
    obj: Record<string, any>
  ): Record<string, any> {
    return Object.entries(obj)
      .filter(([, value]) => typeof value !== "undefined")
      .reduce(
        (accumulator, [key, value]) => ({ ...accumulator, [key]: value }),
        {}
      );
  }

  async sendRequest<T>(
    requestConfig: AxiosRequestConfig,
    callback: never
  ): Promise<T>;
  async sendRequest<T>(
    requestConfig: AxiosRequestConfig,
    callback: Callback<T>
  ): Promise<void>;
  async sendRequest<T>(
    requestConfig: AxiosRequestConfig,
    callback: Callback<T> | never
  ): Promise<void | T> {
    try {
      const modifiedRequestConfig: AxiosRequestConfig = {
        ...requestConfig,
        headers: this.removeUndefinedProperties({
          ...requestConfig.headers,
        }),
        auth: {
          username: this.config.authentication.email,
          password: this.config.authentication.apiKey,
        },
      };

      const response = await this.instance.request(modifiedRequestConfig);

      const callbackResponseHandler =
        callback && ((data: T): void => callback(null, data));
      const defaultResponseHandler = (data: T): T => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.config.middlewares?.onResponse?.(response.data);

      return responseHandler(response.data);
    } catch (e) {
      const callbackErrorHandler =
        callback && ((error: Config.Error) => callback(error));
      const defaultErrorHandler = (error: Error) => {
        throw error;
      };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.config.middlewares?.onError?.(e);

      return errorHandler(e);
    }
  }

  public issues = new Issues(this);
  public userSearch = new UserSearch(this);
}

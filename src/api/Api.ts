/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Component {
  /** Componentid */
  componentid?: number;
  /**
   * Componentname
   * @minLength 1
   * @maxLength 100
   */
  componentname: string;
  /**
   * Componentprice
   * @min -2147483648
   * @max 2147483647
   */
  componentprice: number;
  /**
   * Componentimage
   * @minLength 1
   * @maxLength 256
   */
  componentimage: string;
  /**
   * Componentdescription
   * @maxLength 10000
   */
  componentdescription?: string | null;
  /**
   * Componentstatus
   * @min -32768
   * @max 32767
   */
  componentstatus?: number | null;
}

export interface CreationComponents {
  /** Creation */
  creation: number;
  /** Component */
  component: number;
  /**
   * Componentsnumber
   * @min -2147483648
   * @max 2147483647
   */
  componentsnumber?: number;
}

export interface DatacenterCreation {
  /** Creationid */
  creationid?: number;
  /**
   * Creationdate
   * @format date
   */
  creationdate?: string | null;
  /**
   * Creationapproveddate
   * @format date
   */
  creationapproveddate?: string | null;
  /**
   * Creationrejectiondate
   * @format date
   */
  creationrejectiondate?: string | null;
  /**
   * Creationcompleteddate
   * @format date
   */
  creationcompleteddate?: string | null;
  /**
   * Creationdeletiondate
   * @format date
   */
  creationdeletiondate?: string | null;
  /**
   * Creationstatus
   * @min -32768
   * @max 32767
   */
  creationstatus?: number;
  /** User */
  user?: number;
}

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 255
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Возвращает список компонентов
     *
     * @tags api
     * @name ApiComponentsList
     * @request GET:/api/components/
     * @secure
     */
    apiComponentsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/components/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiComponentsCreate
     * @request POST:/api/components/
     * @secure
     */
    apiComponentsCreate: (data: Component, params: RequestParams = {}) =>
      this.request<Component, any>({
        path: `/api/components/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiComponentsUpdate
     * @request PUT:/api/components/
     * @secure
     */
    apiComponentsUpdate: (data: Component, params: RequestParams = {}) =>
      this.request<Component, any>({
        path: `/api/components/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiComponentsDelete
     * @request DELETE:/api/components/
     * @secure
     */
    apiComponentsDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/components/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Возвращает список компонентов
     *
     * @tags api
     * @name ApiComponentsRead
     * @request GET:/api/components/{id}
     * @secure
     */
    apiComponentsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/components/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiComponentsCreate2
     * @request POST:/api/components/{id}
     * @originalName apiComponentsCreate
     * @duplicate
     * @secure
     */
    apiComponentsCreate2: (id: string, data: Component, params: RequestParams = {}) =>
      this.request<Component, any>({
        path: `/api/components/${id}`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiComponentsUpdate2
     * @request PUT:/api/components/{id}
     * @originalName apiComponentsUpdate
     * @duplicate
     * @secure
     */
    apiComponentsUpdate2: (id: string, data: Component, params: RequestParams = {}) =>
      this.request<Component, any>({
        path: `/api/components/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiComponentsDelete2
     * @request DELETE:/api/components/{id}
     * @originalName apiComponentsDelete
     * @duplicate
     * @secure
     */
    apiComponentsDelete2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/components/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавляет компонент в заявку
     *
     * @tags api
     * @name ApiComponentsPostToCreationCreate
     * @request POST:/api/components/{id}/post_to_creation
     * @secure
     */
    apiComponentsPostToCreationCreate: (id: string, data: Component, params: RequestParams = {}) =>
      this.request<Component, any>({
        path: `/api/components/${id}/post_to_creation`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCreationcomponentsUpdate
     * @request PUT:/api/creationcomponents/
     * @secure
     */
    apiCreationcomponentsUpdate: (data: CreationComponents, params: RequestParams = {}) =>
      this.request<CreationComponents, any>({
        path: `/api/creationcomponents/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCreationcomponentsDelete
     * @request DELETE:/api/creationcomponents/
     * @secure
     */
    apiCreationcomponentsDelete: (data: CreationComponents, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/creationcomponents/`,
        method: "DELETE",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCreationcomponentsUpdate2
     * @request PUT:/api/creationcomponents/{id}
     * @originalName apiCreationcomponentsUpdate
     * @duplicate
     * @secure
     */
    apiCreationcomponentsUpdate2: (id: string, data: CreationComponents, params: RequestParams = {}) =>
      this.request<CreationComponents, any>({
        path: `/api/creationcomponents/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiCreationcomponentsDelete2
     * @request DELETE:/api/creationcomponents/{id}
     * @originalName apiCreationcomponentsDelete
     * @duplicate
     * @secure
     */
    apiCreationcomponentsDelete2: (id: string, data: CreationComponents, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/creationcomponents/${id}`,
        method: "DELETE",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsList
     * @request GET:/api/datacentercreations/
     * @secure
     */
    apiDatacentercreationsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/datacentercreations/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsUpdate
     * @request PUT:/api/datacentercreations/
     * @secure
     */
    apiDatacentercreationsUpdate: (data: DatacenterCreation, params: RequestParams = {}) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsRead
     * @request GET:/api/datacentercreations/{id}
     * @secure
     */
    apiDatacentercreationsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/datacentercreations/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsUpdate2
     * @request PUT:/api/datacentercreations/{id}
     * @originalName apiDatacentercreationsUpdate
     * @duplicate
     * @secure
     */
    apiDatacentercreationsUpdate2: (id: string, data: DatacenterCreation, params: RequestParams = {}) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsModeratorApprovementCreate
     * @request POST:/api/datacentercreations/{id}/moderator_approvement
     * @secure
     */
    apiDatacentercreationsModeratorApprovementCreate: (
      id: string,
      data: DatacenterCreation,
      params: RequestParams = {},
    ) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/${id}/moderator_approvement`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsModeratorCompletionCreate
     * @request POST:/api/datacentercreations/{id}/moderator_completion
     * @secure
     */
    apiDatacentercreationsModeratorCompletionCreate: (
      id: string,
      data: DatacenterCreation,
      params: RequestParams = {},
    ) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/${id}/moderator_completion`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsModeratorDeletionCreate
     * @request POST:/api/datacentercreations/{id}/moderator_deletion
     * @secure
     */
    apiDatacentercreationsModeratorDeletionCreate: (id: string, data: DatacenterCreation, params: RequestParams = {}) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/${id}/moderator_deletion`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsModeratorRejectionCreate
     * @request POST:/api/datacentercreations/{id}/moderator_rejection
     * @secure
     */
    apiDatacentercreationsModeratorRejectionCreate: (
      id: string,
      data: DatacenterCreation,
      params: RequestParams = {},
    ) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/${id}/moderator_rejection`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiDatacentercreationsUserPublishCreate
     * @request POST:/api/datacentercreations/{id}/user_publish
     * @secure
     */
    apiDatacentercreationsUserPublishCreate: (id: string, data: DatacenterCreation, params: RequestParams = {}) =>
      this.request<DatacenterCreation, any>({
        path: `/api/datacentercreations/${id}/user_publish`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login
     * @secure
     */
    loginCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/login`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Функция регистрации новых пользователей Если пользователя c указанным в request email ещё нет, в БД будет добавлен новый пользователь.
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}

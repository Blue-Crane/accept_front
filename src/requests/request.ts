export const withPrefix = (path: string) => `/api/${path}`;

export type availableMethods = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface IResponse<T> {
  error: boolean;
  detail: any;
  response: T;
}
export interface IPureResponse {
  error: boolean;
  detail: any;
}

export const sendRequest = <ISend, IReceive>(
  path: string,
  method: availableMethods,
  body?: ISend extends object ? ISend : object
): Promise<IResponse<IReceive>> => {
  let options: any = {
    credentials: 'include',
    method,
  };
  if (body) {
    options.body = JSON.stringify(body as object);
  }
  return fetch(withPrefix(path), options)
    .then((res) =>
      res.status === 200
        ? res.json().then((res) => ({
            error: false,
            detail: {},
            response: res as IReceive,
          }))
        : res.json().then((res) => ({
            error: true,
            detail: res.detail,
            response: {},
          }))
    )
    .then((res) => res as IResponse<IReceive>)
    .catch(
      (e) =>
        ({
          error: true,
          response: {},
          detail: {
            descriptionRU: 'Ошибка на стороне клиента',
            description: 'Client side error',
          },
        } as IResponse<IReceive>)
    );
};

export const isSuccessful = <ISend>(
  path: string,
  method: availableMethods,
  body?: ISend extends object ? ISend : object
): Promise<IPureResponse> => {
  let options: any = {
    credentials: 'include',
    method,
  };
  if (body) {
    options.body = JSON.stringify(body as object);
  }
  return fetch(withPrefix(path), options)
    .then((res) =>
      res.status === 200
        ? { error: false, detail: '' }
        : res
            .json()
            .then((res) => ({ error: true, detail: res.detail }))
    )
    .catch((_) => ({
      error: true,
      detail: {
        descriptionRU: 'Ошибка на стороне клиента',
        description: 'Client side error',
      },
    }));
};

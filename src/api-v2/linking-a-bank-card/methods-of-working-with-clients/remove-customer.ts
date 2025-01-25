import { mainAPI } from "UTILS/api";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  TerminalKey: string;
  CustomerKey: string;
  Token: string;
  IP: string;
};

type TResponse = {
  TerminalKey: string;
  CustomerKey: string;
  ErrorCode: string;
  Success: boolean;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Метод для удаления сохраненных данных клиента.
 */
export const removeCustomer = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/RemoveCustomer`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

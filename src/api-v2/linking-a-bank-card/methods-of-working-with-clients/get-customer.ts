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

type TResponse = null;

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Возвращает данные клиента, сохраненные в связке с терминалом
 */
export const getCustomer = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetCustomer`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

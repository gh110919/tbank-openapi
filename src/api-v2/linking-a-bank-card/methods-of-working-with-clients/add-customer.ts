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
  Email: string;
  Phone: string;
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
Регистрирует клиента в связке с терминалом.

Можно автоматически связать клиента с картой, которой был произведен платеж, если в методе Init передать параметр CustomerKey. Это позволит сохранить и позже показывать клиенту замаскированный номер карты, по которой будет совершен рекуррентный платеж.
 */
export const addCustomer = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/AddCustomer`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

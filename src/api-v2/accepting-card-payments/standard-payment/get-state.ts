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
  PaymentId: string;
  Token: string;
  IP: string;
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  Message: string;
  TerminalKey: string;
  Status: string;
  PaymentId: string;
  OrderId: string;
  Params: {
    Key: string;
    Value: string;
  }[];
  Amount: number;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Метод возвращает статус платежа.
 */
export const getState = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetState`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

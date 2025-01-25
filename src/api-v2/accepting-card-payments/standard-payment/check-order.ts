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
  OrderId: string;
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
  Payments: {
    PaymentId: string;
    Amount: number;
    Status: string;
    RRN: string;
    Success: string;
    ErrorCode: number;
    Message: string;
  }[];
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Метод возвращает статус заказа.
 */
export const checkOrder = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/CheckOrder`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

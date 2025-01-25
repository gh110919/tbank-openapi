import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  TerminalKey: string;
  PaymentId: number;
  DataType: string;
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Data: string;
  PaymentId: number;
  ErrorCode: string;
  Message: string;
  Details: string;
  RequestKey: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const getQr = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetQr`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

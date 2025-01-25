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
  PaymentId: string;
  Token: string;
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  Status: string;
  QrCancelCode: string;
  QrCancelMessage: string;
  OrderId: string;
  Amount: number;
  Message: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Возвращает статус возврата платежа по СБП
 */
export const getQrState = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetQrState`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

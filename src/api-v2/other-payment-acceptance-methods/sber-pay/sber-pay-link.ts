import { mainAPI } from "UTILS/api";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  Params: {
    RedirectUrl: string;
  };
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
  paymentId: string;
}>;
/**
 * Метод для получения ссылки SberPay.
 */
export const sberPayLink = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { paymentId } = params!;

  const url = `/SberPay/transactions/${paymentId}/link`;

  try {
    return {
      success: true,
      message: await mainAPI.get(url),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

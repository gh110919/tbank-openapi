import { mainAPI } from "UTILS/api";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = null;

type TParams<T> = Partial<{
  data: T;
  paymentId: string;
}>;
/**
 * Метод получения QR для десктопов.
 */
export const sberPayQr = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { paymentId } = params!;

  const url = `/SberPay/${paymentId}/QR`;

  try {
    return {
      success: true,
      message: await mainAPI.get(url),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

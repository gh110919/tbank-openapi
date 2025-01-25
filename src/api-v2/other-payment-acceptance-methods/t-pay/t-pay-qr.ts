import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";

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
export const tPayQr = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { paymentId } = params!;

  const url = `/TinkoffPay/${paymentId}/QR`;

  try {
    return {
      success: true,
      message: await mainAPI.get(url),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

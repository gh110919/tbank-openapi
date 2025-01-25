import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TResponse = {
  Params: {
    Allowed: boolean;
    Version: string;
  };
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};
/**
 * Метод для определения возможности проведения платежа T‑Pay на терминале и устройстве.
 */
export const status = async (): TReturn<TMessage<TResponse>> => {
  const { TERMINAL_KEY } = environment;

  const url = `/TinkoffPay/terminals/${TERMINAL_KEY}/status`;

  try {
    return {
      success: true,
      message: await mainAPI.get(url),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

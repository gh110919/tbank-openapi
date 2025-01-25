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
  IsDeadlineExpired: boolean;
  IsRejected: boolean;
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Тестовая платежная сессия с предопределенным статусом по СБП.
 */
export const sbpPayTest = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/SbpPayTest`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

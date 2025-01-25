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
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  AccountTokens: {
    RequestKey: string;
    Status: string;
    AccountToken: string;
    BankMemberId: string;
    BankMemberName: string;
  };
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Метод возвращает список привязанных счетов клиента по магазину
 */
export const getAccountQrList = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetAccountQrList`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

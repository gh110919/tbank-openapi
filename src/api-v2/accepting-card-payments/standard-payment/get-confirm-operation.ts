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
  CallbackUrl: string;
  PaymentIdList: number[];
  Token: string;
};

type TResponse = {
  Success: boolean;
  ErrorCode: number;
  Message: string;
  PaymentIdList: {
    Success: boolean;
    ErrorCode: number;
    Message: string;
    PaymentId: string;
  }[];
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Справку по конкретной операции можно получить на:

URL-сервиса, который развернут на вашей стороне;
электронную почту.
Чтобы сформировать токен, нужно использовать только PASSWORD и TERMINAL_KEY.
*/
export const getConfirmOperation = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/getConfirmOperation`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

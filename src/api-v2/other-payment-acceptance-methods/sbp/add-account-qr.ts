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
  Description: string;
  DataType: string;
  Data: {
    property1: string;
    property2: string;
  };
  RedirectDueDate: string;
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  Description: string;
  DataType: string;
  Data: string;
  RequestKey: string;
  ErrorCode: string;
  Success: boolean;
  Message: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const addAccountQr = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/AddAccountQr`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

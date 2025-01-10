import { mainAPI } from "../../utils/api";
import { environment } from "../../utils/environment";

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
/*  */
export const getConfirmOperation = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/getConfirmOperation`;

  const headers = {
    Authorization: `Bearer ${TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data, { headers }),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

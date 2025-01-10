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
  PaymentId: string;
  Token: string;
  IP: string;
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  Message: string;
  TerminalKey: string;
  Status: string;
  PaymentId: string;
  OrderId: string;
  Params: {
    Key: string;
    Value: string;
  }[];
  Amount: number;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const getState = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/GetState`;

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

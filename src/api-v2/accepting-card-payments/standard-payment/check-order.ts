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
  OrderId: string;
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
  Payments: {
    PaymentId: string;
    Amount: number;
    Status: string;
    RRN: string;
    Success: string;
    ErrorCode: number;
    Message: string;
  }[];
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const checkOrder = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/CheckOrder`;

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

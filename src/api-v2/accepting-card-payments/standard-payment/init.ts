import { mainAPI } from "../../../utils/api";
import { environment } from "../../../utils/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Description: string;
  Token: string;
  DATA: {
    Phone: string;
    Email: string;
  };
  Receipt: {
    Email: string;
    Phone: string;
    Taxation: string;
    Items: {
      Name: string;
      Price: number;
      Quantity: number;
      Amount: number;
      Tax: string;
      Ean13: string;
    }[];
  };
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  TerminalKey: string;
  Status: string;
  PaymentId: string;
  OrderId: string;
  Amount: number;
  PaymentURL: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/* Метод инициирует платежную сессию */
export const init = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/Init`;

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

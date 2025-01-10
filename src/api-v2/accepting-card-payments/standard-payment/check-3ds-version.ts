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
  PaymentId: number;
  TerminalKey: string;
  CardData: string;
  Token: string;
};

type TResponse = {
  Version: string;
  TdsServerTransID: string;
  ThreeDSMethodURL: string;
  PaymentSystem: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const check3dsVersion = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/Check3dsVersion`;

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

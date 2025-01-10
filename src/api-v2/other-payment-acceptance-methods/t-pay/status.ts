import axios from "axios";
import { mainAPI } from "../../../utils/api";
import { environment } from "../../../utils/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

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

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const status = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { API_VERSION, TOKEN_JWT, TERMINAL_KEY } = environment;

  const url = `/${API_VERSION}/TinkoffPay/terminals/${TERMINAL_KEY}/status`;

  const headers = {
    Authorization: `Bearer ${TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await mainAPI.get(url, { headers }),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

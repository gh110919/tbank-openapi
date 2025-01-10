import axios from "axios";
import { environment } from "../../../utils/environment";
import { mainAPI } from "../../../utils/api";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = null;

type TResponse = {
  summary: string;
  value: {
    Params: {
      RedirectUrl: string;
      WebQR: string;
    };
    Success: boolean;
    ErrorCode: string;
    Message: string;
    Details: string;
  };
};

type TParams<T> = Partial<{
  data: T;
  paymentId: string;
}>;
/*  */
export const tPayLink = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { paymentId } = params!;

  const { API_VERSION, TOKEN_JWT, T_PAY } = environment;

  const url = `/${API_VERSION}/TinkoffPay/transactions/${paymentId}/versions/${T_PAY}/link`;

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

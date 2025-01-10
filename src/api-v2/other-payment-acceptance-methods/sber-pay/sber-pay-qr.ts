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

type TResponse = null;

type TParams<T> = Partial<{
  data: T;
  paymentId: string;
}>;
/*  */
export const sberPayQr = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { paymentId } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/SberPay/${paymentId}/QR`;

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

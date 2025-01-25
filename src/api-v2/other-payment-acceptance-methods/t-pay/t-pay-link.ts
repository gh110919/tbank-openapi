import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";

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
/**
 * Метод получения Link для безусловного редиректа на мобильных устройствах
 */
export const tPayLink = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { paymentId } = params!;

  const { T_PAY } = environment;

  const url = `/TinkoffPay/transactions/${paymentId}/versions/${T_PAY}/link`;

  try {
    return {
      success: true,
      message: await mainAPI.get(url),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

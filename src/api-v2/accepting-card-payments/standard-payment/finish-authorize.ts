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
  SendEmail: boolean;
  Source: string;
  DATA: {
    threeDSCompInd: string;
    language: string;
    timezone: string;
    screen_height: string;
    screen_width: string;
    cresCallbackUrl: string;
    colorDepth: string;
    javaEnabled: string;
  };
  InfoEmail: string;
  EncryptedPaymentData: string;
  CardData: string;
  Amount: number;
  deviceChannel: string;
  Route: string;
};

type TResponse = {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: string;
  ErrorCode: string;
  Message: string;
  Details: string;
  RebillId: string;
  CardId: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const finishAuthorize = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/FinishAuthorize`;

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

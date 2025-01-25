import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  TerminalKey: string;
  EventData: {
    SessionId: string;
    Type: string;
    AccessToken: string;
    AccountId: string;
    EventSessionId: string;
  };
  PaymentId: string;
  Token: string;
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
 * Передача уведомления о событии платежного виджета T‑Pay + T‑ID.
 */
export const tinkoffPayEvent = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/TinkoffPayEvent`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

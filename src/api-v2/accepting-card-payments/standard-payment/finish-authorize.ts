import { mainAPI } from "UTILS/api";

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
/**
Для мерчантов, использующих собственную платежную форму

Метод подтверждает платеж передачей реквизитов. При одностадийной оплате — списывает средства с карты клиента, при двухстадийной — блокирует указанную сумму. Используется, если у площадки есть сертификация PCI DSS и собственная платежная форма.
*/
export const finishAuthorize = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/FinishAuthorize`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

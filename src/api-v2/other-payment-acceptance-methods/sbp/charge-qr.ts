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
  PaymentId: string;
  AccountToken: string;
  Token: string;
  IP: string;
  SendEmail: boolean;
  InfoEmail: string;
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
  Currency: number;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Проведение платежа по привязанному счету по QR через СБП. Для возможности его использования клиент должен совершить успешную привязку счета с  помощью метода AddAccountQr. После вызова метода будет отправлена нотификация на Notification URL о привязке счета , в которой будет указан AccountToken. Для совершения платежа по привязанному счету Мерчант должен вызвать метод Init, в котором поля  Recurrent= Y и DATA= {“QR”:“true”}, а затем вызвать метод ChargeQr для оплаты по тем же самым  реквизитам и передать параметр AccountToken, полученный после привязки счета по QR в  нотификации.
 */
export const chargeQr = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/ChargeQr`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

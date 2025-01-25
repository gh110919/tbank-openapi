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
  CustomerKey: string;
  Token: string;
  CheckType: string;
  IP: string;
  ResidentState: boolean;
};

type TResponse = {
  PaymentId: number;
  TerminalKey: string;
  CustomerKey: string;
  RequestKey: string;
  ErrorCode: string;
  Success: boolean;
  Message: string;
  Details: string;
  PaymentURL: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Для мерчантов, использующих собственную платежную форму

Метод инициирует привязку карты к клиенту. При успешной привязке переадресует клиента на Success Add Card URL, при неуспешной — на Fail Add Card URL. Можно использовать форму Т‑Кассы или заменить её на кастомную.
 */
export const addCard = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/AddCard`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

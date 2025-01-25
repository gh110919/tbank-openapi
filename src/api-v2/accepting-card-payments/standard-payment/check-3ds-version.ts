import { mainAPI } from "UTILS/api";

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
/**
Для мерчантов, использующих собственную платежную форму

Проверяет поддерживаемую версию 3DS-протокола по карточным данным из входящих параметров.

При использовании второй версии можно получить данные для дополнительного метода 3DS Method, который позволяет эмитенту собрать данные браузера клиента. Это может быть полезно при принятии решения в пользу Frictionless Flow — аутентификации клиента без редиректа на страницу ACS.
 */
export const check3dsVersion = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/Check3dsVersion`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

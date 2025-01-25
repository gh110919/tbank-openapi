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
  RequestKey: string;
  CardData: string;
  DATA: {
    property1: string;
    property2: string;
  };
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  CustomerKey: string;
  RequestKey: string;
  CardId: string;
  Success: boolean;
  ErrorCode: string;
  Status: string;
  RebillId: string;
  Message: string;
  Details: string;
  ACSUrl: string;
  TdsServerTransId: string;
  AcsTransId: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Для мерчантов, использующих собственную платежную форму
Завершает привязку карты к клиенту.
В случае успешной привязки переадресует клиента на Success Add Card URL в противном случае на Fail Add Card URL.
Для прохождения 3DS второй версии перед вызовом метода должен быть вызван /v2/check3dsVersion и выполнен 3DS Method, который является обязательным при прохождении 3DS по протоколу версии 2.0.
 */
export const attachCard = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/AttachCard`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

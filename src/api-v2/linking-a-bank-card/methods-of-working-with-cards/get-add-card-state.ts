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
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  RequestKey: string;
  Status: string;
  Success: boolean;
  CardId: string;
  RebillId: string;
  ErrorCode: string;
  Message: string;
  Details: string;
  CustomerKey: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Для мерчантов, использующих собственную платежную форму
Метод возвращает статус привязки карты
 */
export const getAddCardState = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetAddCardState`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

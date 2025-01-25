import axios from "axios";

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
  CardId: string;
  Token: string;
  IP: string;
};

type TResponse = {
  TerminalKey: string;
  Status: string;
  CustomerKey: string;
  CardId: string;
  CardType: number;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/**
Метод для удаления привязанной карты клиента.
 */
export const removeCard = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/RemoveCard`;

  try {
    return {
      success: true,
      message: await axios.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

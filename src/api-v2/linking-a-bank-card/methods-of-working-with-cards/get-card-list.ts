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
  SavedCard: boolean;
  Token: string;
  IP: string;
};

type TResponse = {
  CardId: string;
  Pan: string;
  Status: string;
  RebillId: string;
  CardType: number;
  ExpDate: string;
}[];

type TParams<T> = Partial<{
  data: T;
}>;
/**
Возвращает список всех привязанных карт клиента, включая удаленные
 */
export const getCardList = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/GetCardList`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

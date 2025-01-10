import axios from "axios";
import { environment } from "../../../utils/environment";

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
/*  */
export const removeCard = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/RemoveCard`;

  const headers = {
    Authorization: `Bearer ${TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await axios.post(url, data, { headers }),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

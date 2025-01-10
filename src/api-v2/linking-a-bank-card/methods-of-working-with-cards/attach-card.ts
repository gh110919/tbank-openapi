import axios from "axios";
import { mainAPI } from "../../../utils/api";
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
/*  */
export const attachCard = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/AttachCard`;

  const headers = {
    Authorization: `Bearer ${TOKEN_JWT}`,
  };

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data, { headers }),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

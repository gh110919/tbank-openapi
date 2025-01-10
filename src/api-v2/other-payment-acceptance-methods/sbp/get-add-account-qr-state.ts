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
  RequestKey: string;
  TerminalKey: string;
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  RequestKey: number;
  BankMemberId: string;
  BankMemberName: string;
  AccountToken: string;
  Success: boolean;
  Status: string;
  ErrorCode: string;
  Message: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const getAddAccountQrState = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/GetAddAccountQrState`;

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

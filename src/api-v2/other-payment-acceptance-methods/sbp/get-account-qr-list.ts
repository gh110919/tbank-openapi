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
  Token: string;
};

type TResponse = {
  TerminalKey: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  AccountTokens: {
    RequestKey: string;
    Status: string;
    AccountToken: string;
    BankMemberId: string;
    BankMemberName: string;
  };
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const getAccountQrList = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/GetAccountQrList`;

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

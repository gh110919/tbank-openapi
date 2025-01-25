import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  TerminalKey: string;
  PaymentId: string;
  Token: string;
};

type TResponse = {
  Members: {
    MemberId: string;
    MemberName: string;
    IsPayee: boolean;
  }[];
  OrderId: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const qrMembersList = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/QrMembersList`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

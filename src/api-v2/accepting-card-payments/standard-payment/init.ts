import { JSDocParsingMode } from "typescript";
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
  Amount: number;
  OrderId: string;
  Description: string;
  Token: string;
  DATA: {
    Phone: string;
    Email: string;
  };
  Receipt: {
    Email: string;
    Phone: string;
    Taxation: string;
    Items: {
      Name: string;
      Price: number;
      Quantity: number;
      Amount: number;
      Tax: string;
      Ean13?: string;
    }[];
  };
};

type TResponse = {
  Success: boolean;
  ErrorCode: string;
  TerminalKey: string;
  Status: string;
  PaymentId: string;
  OrderId: string;
  Amount: number;
  PaymentURL: string;
};

type TParams<T> = Partial<{
  data: Partial<T>;
}>;
/**
 * Метод инициирует платежную сессию.
 */
export const init = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;
  
  const url = `/Init`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

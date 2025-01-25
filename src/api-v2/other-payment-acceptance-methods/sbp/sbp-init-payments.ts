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
  container: string;
  TerminalKey: string;
  paymentInfo: {
    InfoEmail: string;
    PaymentData: {
      TerminalKey: string;
      Amount: number;
      OrderId: string;
      Description: string;
      DATA: Record<string, any>;
      Receipt: {
        Items: {
          Name: string;
          Price: number;
          Quantity: number;
          Amount: number;
          PaymentMethod: string;
          PaymentObject: string;
          Tax: string;
          Ean13: string;
          ShopCode: string;
          AgentData: {
            AgentSign: string;
            OperationName: string;
            Phones: string[];
            ReceiverPhones: string[];
            TransferPhones: string[];
            OperatorName: string;
            OperatorAddress: string;
            OperatorInn: string;
          };
          SupplierInfo: {
            Phones: string[];
            Name: string;
            Inn: string;
          };
          FfdVersion: string;
          Email: string;
          Phone: string;
          Taxation: string;
          Payments: {
            Cash: number;
            Electronic: number;
            AdvancePayment: number;
            Credit: number;
            Provision: number;
          };
        }[];
      };
    };
  };
  paymentItems: {
    container: string;
    paymentInfo: {
      InfoEmail: string;
      PaymentData: {
        TerminalKey: string;
        Amount: number;
        OrderId: string;
        Description: string;
        DATA: Record<string, any>;
        Receipt: {
          Items: {
            Name: string;
            Price: number;
            Quantity: number;
            Amount: number;
            PaymentMethod: string;
            PaymentObject: string;
            Tax: string;
            Ean13: string;
            ShopCode: string;
            AgentData: {
              AgentSign: string;
              OperationName: string;
              Phones: string[];
              ReceiverPhones: string[];
              TransferPhones: string[];
              OperatorName: string;
              OperatorAddress: string;
              OperatorInn: string;
            };
            SupplierInfo: {
              Phones: string[];
              Name: string;
              Inn: string;
            };
            FfdVersion: string;
            Email: string;
            Phone: string;
            Taxation: string;
            Payments: {
              Cash: number;
              Electronic: number;
              AdvancePayment: number;
              Credit: number;
              Provision: number;
            };
          }[];
        };
      };
    };
  }[];
  paymentSystems: {
    TinkoffPay: Record<string, any>;
  };
};

type TResponse = {
  Success: boolean;
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const sbpInitPayments = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/InitPayments`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

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
  PaymentId: string;
  Token: string;
  IP: string;
  Amount: number;
  Receipt: {
    FfdVersion: string;
    ClientInfo: {
      Birthdate: string;
      Citizenship: string;
      DocumentСode: string;
      DocumentData: string;
      Address: string;
    };
    Taxation: string;
    Email: string;
    Phone: string;
    Customer: string;
    CustomerInn: string;
    Items: [
      {
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
        Name: string;
        Price: number;
        Quantity: number;
        Amount: number;
        Tax: string;
        PaymentMethod: string;
        PaymentObject: string;
        UserData: string;
        Excise: string;
        CountryCode: string;
        DeclarationNumber: string;
        MeasurementUnit: string;
        MarkProcessingMode: string;
        MarkCode: {
          MarkCodeType: string;
          Value: string;
        };
        MarkQuantity: {
          Numerator: number;
          Denominator: number;
        };
        SectoralItemProps: {
          FederalId: string;
          Date: string;
          Number: string;
          Value: string;
        };
      }
    ];
    Payments: {
      Cash: number;
      Electronic: number;
      AdvancePayment: number;
      Credit: number;
      Provision: number;
    };
  };
  Shops: {
    ShopCode: string;
    Amount: number;
    Name: string;
  }[];
  QrMemberId: string;
  Route: string;
  Source: string;
  ExternalRequestId: string;
};

type TResponse = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Status: string;
  OriginalAmount: number;
  NewAmount: number;
  PaymentId: string;
  ErrorCode: string;
  Message: string;
  Details: string;
  ExternalRequestId: string;
};

type TParams<T> = Partial<{
  data: Partial<T>;
}>;
/**
Отменяет платежную сессию. В зависимости от статуса платежа, переводит его в следующие состояния:

NEW — CANCELED;
AUTHORIZED — PARTIAL_REVERSED, если отмена не на полную сумму;
AUTHORIZED — REVERSED, если отмена на полную сумму;
CONFIRMED — PARTIAL_REFUNDED, если отмена не на полную сумму;
CONFIRMED — REFUNDED, если отмена на полную сумму.
При оплате в рассрочку платеж можно отменить только в статусе AUTHORIZED. При оплате «Долями» делается частичный или полный возврат, если операция в статусе CONFIRMED или PARTIAL_REFUNDED.

Если платеж находился в статусе AUTHORIZED, холдирование средств на карте клиента отменяется. При переходе из статуса CONFIRMED денежные средства возвращаются на карту клиента.
 */
export const cancel = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const url = `/Cancel`;

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

import axios from "axios";
import { mainAPI } from "../../utils/api";
import { environment } from "../../utils/environment";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest =
  | {
      TerminalKey: string;
      Amount: number;
      OrderId: string;
      Success: boolean;
      Status: string;
      PaymentId: number;
      ErrorCode: string;
      Message: string;
      Details: string;
      RebillId: number;
      CardId: number;
      Pan: string;
      ExpDate: string;
      Token: string;
      DATA: {
        Route: string;
        Source: string;
        CreditAmount: number;
      };
    }
  | {
      TerminalKey: string;
      CustomerKey: string;
      RequestKey: string;
      Success: boolean;
      Status: string;
      PaymentId: number;
      ErrorCode: string;
      RebillId: string;
      CardId: string;
      Pan: string;
      ExpDate: string;
      Token: string;
    }
  | {
      TerminalKey: string;
      OrderId: string;
      Success: boolean;
      Status: string;
      PaymentId: number;
      ErrorCode: string;
      ErrorMessage: string;
      Amount: number;
      FiscalNumber: number;
      ShiftNumber: number;
      ReceiptDatetime: string;
      FnNumber: string;
      EcrRegNumber: string;
      FiscalDocumentNumber: number;
      FiscalDocumentAttribute: number;
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
        Items: {
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
        }[];
        Payments: {
          Cash: number;
          Electronic: number;
          AdvancePayment: number;
          Credit: number;
          Provision: number;
        }[];
      };
      Type: string;
      Token: string;
      Ofd: string;
      Url: string;
      QrCodeUrl: string;
      CalculationPlace: string;
      CashierName: string;
      SettlePlace: string;
    }
  | {
      TerminalKey: string;
      RequestKey: string;
      AccountToken: string;
      BankMemberId: string;
      BankMemberName: string;
      NotificationType: string;
      Success: boolean;
      ErrorCode: string;
      Message: string;
      Token: string;
      Status: string;
    };

type TResponse = null;

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const notification = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `http://api.merchant-site.com/${API_VERSION}/Notification`;

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
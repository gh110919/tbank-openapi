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
    };
  };
  Shops: {
    ShopCode: string;
    Amount: number;
    Name: string;
    Fee: string;
  }[];
  Route: string;
  Source: string;
};

type TResponse = {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: string;
  ErrorCode: string;
  Message: string;
  Details: string;
  Params: {
    Key: string;
    Value: string;
  }[];
};

type TParams<T> = Partial<{
  data: T;
}>;
/*  */
export const confirm = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { data } = params!;

  const { API_VERSION, TOKEN_JWT } = environment;

  const url = `/${API_VERSION}/Confirm`;

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

import { html } from "lit";
import { mainAPI } from "../../../utils/api";
import { dataJsonBase64 } from "../../../utils/data-json-base64";
import { environment } from "../../../utils/environment";
import { litRTS } from "../utils/lit-render";
import { tokenizer } from "../../../utils/tokenizer";

type TReturn<T> = Promise<{
  success: boolean;
  message: T;
}>;

type TMessage<T> = {
  data: T;
};

type TRequest = {
  threeDSServerTransID: string;
  threeDSMethodNotificationURL: string;
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
};

type TParams<T> = Partial<{
  data: T;
  MD: string;
  PaymentId: string;
  TerminalKey: string;
}>;
/*  */
export const submit3DSAuthorization = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { API_VERSION, TOKEN_JWT, TERMINAL_PASSWORD } = environment;

  const url = `/${API_VERSION}/Submit3DSAuthorization`;

  const base64 = dataJsonBase64(params?.data);

  const token = tokenizer(params?.data, TERMINAL_PASSWORD);

  const data = litRTS(
    html`
      <body onload="document.form.submit()">
        <form name="form" action="." method="post">
          <input type="hidden" name="MD" value="${params?.MD}" />
          <input type="hidden" name="PaRes" value="${base64}" />
          <input type="hidden" name="PaymentId" value="${params?.PaymentId}" />
          <input
            type="hidden"
            name="TerminalKey"
            value="${params?.TerminalKey}"
          />
          <input type="hidden" name="Token" value="${token}" />
        </form>
      </body>
    `
  );

  const headers = {
    Authorization: `Bearer ${TOKEN_JWT}`,
    "Content-Type": "application/x-www-form-urlencoded",
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

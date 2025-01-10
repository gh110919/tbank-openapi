import { html } from "lit";
import { mainAPI } from "../../utils/api";
import { environment } from "../../utils/environment";
import { litRTS } from "../utils/lit-render";
import { tokenizer } from "../../utils/tokenizer";

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
  OrderId: string;
  TerminalKey: string;
  Status: string;
  PaymentId: string;
  Success: boolean;
  ErrorCode: string;
  Message: string;
  Details: string;
};

type TParams<T> = Partial<{
  data: T;
  PaymentId: string;
  TerminalKey: string;
}>;
/*  */
export const submit3DSAuthorizationV2 = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { API_VERSION, TOKEN_JWT, TERMINAL_PASSWORD } = environment;

  const url = `/${API_VERSION}/Submit3DSAuthorizationV2`;

  const token = tokenizer(params?.data, TERMINAL_PASSWORD);

  const data = litRTS(
    html`
      <body onload="document.form.submit()">
        <form name="form" action="." method="post">
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

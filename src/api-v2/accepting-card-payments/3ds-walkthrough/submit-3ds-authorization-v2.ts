import { html } from "lit";
import { mainAPI } from "UTILS/api";
import { environment } from "UTILS/environment";
import { litRTS } from "UTILS/lit-rts";
import { tokenizer } from "UTILS/tokenizer";

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
/**
Для мерчантов, использующих собственную платежную форму

Проверяет результаты прохождения 3-D Secure и при успешном прохождении подтверждает инициированный платеж. При использовании:

одностадийной оплаты — списывает денежные средства с карты клиента;
двухстадийной оплаты — блокирует указанную сумму на карте клиента.
Формат запроса — x-www-form-urlencoded.

После того, как мерчант получит ответ ACS с результатами прохождения 3-D Secure на cresCallbackUrl, нужно отправить запрос через метод Submit3DSAuthorizationV2.
*/
export const submit3DSAuthorizationV2 = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { TERMINAL_PASSWORD } = environment;

  const url = `/Submit3DSAuthorizationV2`;

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

  try {
    return {
      success: true,
      message: await mainAPI.post(url, data),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

import { html } from "lit";
import { mainAPI } from "UTILS/api";
import { dataJsonBase64 } from "UTILS/data-json-base64";
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
/**
Для мерчантов, использующих собственную платежную форму

Проверяет результаты прохождения 3-D Secure и при успешном прохождении подтверждает инициированный платеж. При использовании:

одностадийной оплаты — списывает денежные средства с карты клиента;
двухстадийной оплаты — блокирует указанную сумму на карте клиента.
Формат запроса — x-www-form-urlencoded.

После того, как мерчант получит ответ ACS с результатами прохождения 3-D Secure на TermUrl, нужно отправить запрос через метод Submit3DSAuthorization.
*/
export const submit3DSAuthorization = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { TERMINAL_PASSWORD } = environment;

  const url = `/Submit3DSAuthorization`;

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

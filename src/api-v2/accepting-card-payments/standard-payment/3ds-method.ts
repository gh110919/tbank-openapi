import axios, { RawAxiosRequestHeaders } from "axios";
import { html } from "lit";
import { dataJsonBase64 } from "UTILS/data-json-base64";
import { environment } from "UTILS/environment";
import { litRTS } from "UTILS/lit-rts";

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

type TResponse = null;

type TParams<T> = Partial<{
  data: T;
}>;
/**
Для Мерчантов с PCI DSS
Если в ответе метода был получен параметр ThreeDSMethodURL, то необходимо отправить запрос на стороне браузера по полученному ThreeDSMethodURL. Это необходимо для сбора информации ACS-ом о девайсе клиента. Отправка запроса 3DS Method в браузере должна происходить в скрытом frame.
Время ожидания выполнения метода не более 10 секунд
*/
export const _3DSMethod = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const url = `https://acs.vendorcert.mirconnect.ru/ds/6300/v2/3DSMethod`;

  const base64 = dataJsonBase64(params?.data);

  const data = litRTS(
    html`
      <body onload="document.form.submit()">
        <form name="form" action="." method="post">
          <input type="hidden" name="threeDSMethodData" value="${base64}" />
        </form>
      </body>
    `
  );

  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    return {
      success: true,
      message: await axios.post(url, data, { headers }),
    };
  } catch (error) {
    throw new Error(String(error));
  }
};

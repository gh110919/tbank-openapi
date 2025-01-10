import axios, { RawAxiosRequestHeaders } from "axios";
import { html, TemplateResult } from "lit";
import { environment } from "../../../utils/environment";
import { dataJsonBase64 } from "../../../utils/data-json-base64";

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
/*  */
export const _3DSMethod = async (
  params?: TParams<TRequest>
): TReturn<TMessage<TResponse>> => {
  const { TOKEN_JWT } = environment;

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
    Authorization: `Bearer ${TOKEN_JWT}`,
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
function litRTS(arg0: TemplateResult<1>) {
  throw new Error("Function not implemented.");
}

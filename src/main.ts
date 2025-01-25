import { cancel } from "API_V2/accepting-card-payments/cancel-a-payment/cancel";
import { init } from "API_V2/accepting-card-payments/standard-payment/init";
import { environment } from "UTILS/environment";
import { tokenizer } from "UTILS/tokenizer";
import { v4 } from "uuid";

(async function (): Promise<void> {
  try {
    const { TERMINAL_KEY, TERMINAL_PASSWORD, PHONE, EMAIL } = environment;

    const initParams = {
      TerminalKey: TERMINAL_KEY,
      Amount: 10000,
      OrderId: v4(),
      Description: "тест",
      DATA: {
        Phone: PHONE,
        Email: EMAIL,
      },
      Receipt: {
        Email: EMAIL,
        Phone: PHONE,
        Taxation: "osn",
        Items: [
          {
            Name: "Наименование товара 1",
            Price: 10000,
            Quantity: 1.0,
            Amount: 10000,
            Tax: "none",
          },
        ],
      },
    };

    const init_ = await init({
      data: {
        ...initParams,
        Token: tokenizer(initParams, TERMINAL_PASSWORD),
      },
    });

    const cancel_data = { TerminalKey: TERMINAL_KEY, PaymentId: "5703784160" };

    const cancel_ = await cancel({
      data: {
        ...cancel_data,
        Token: tokenizer(cancel_data, TERMINAL_PASSWORD),
      },
    });
  } catch (error) {
    console.log("error", error);
  }
})();

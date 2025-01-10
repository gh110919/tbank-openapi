import { v4 } from "uuid";
import { _3DSMethod } from "./api-v2/3ds-method";
import { init } from "./api-v2/init";
import { environment } from "./utils/environment";
import { tokenizer } from "./utils/tokenizer";

(async function (): Promise<void> {
  try {
    const { TERMINAL_KEY, TERMINAL_PASSWORD } = environment;

    const initParams = {
      data: {
        TerminalKey: TERMINAL_KEY,
        Amount: 100,
        OrderId: v4(),
        Description: "тест",
        DATA: {
          Phone: "+71234567890",
          Email: "a@test.com",
        },
        Receipt: {
          Email: "a@test.com",
          Phone: "+71234567890",
          Taxation: "osn",
          Items: [],
        },
      },
    };

    const init_ = await init({
      data: {
        ...initParams.data,
        Token: tokenizer(initParams.data, TERMINAL_PASSWORD),
      },
    });

    // console.log('init_', init_.message);

    const _3DSMethod_ = await _3DSMethod({
      data: {
        threeDSServerTransID: "56e712a5-190a-4588-91bc-e08626e77c44",
        threeDSMethodNotificationURL:
          "https://rest-api-test.tinkoff.ru/v2/Complete3DSMethodv2",
      },
    });

    // console.log(_3DSMethod_.message);
  } catch (error) {
    console.log("error", error);
  }
})();

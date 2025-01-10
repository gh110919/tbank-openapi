import { render } from "@lit-labs/ssr";
import { collectResultSync } from "@lit-labs/ssr/lib/render-result";
import { TemplateResult } from "lit";

/** RENDER TO STRING
 * @param template - результат работы функции html из библиотеки lit.
 */
export const litRTS = (template: TemplateResult<1>): string => {
  return collectResultSync(render(template));
};

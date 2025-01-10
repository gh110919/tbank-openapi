import { createHash } from "crypto";

export const tokenizer = (data: any, password: string): string => {
  return createHash("sha256")
    .update(
      [
        ...Object.entries(data)
          .filter(([_, v]) => typeof v !== "object" || v === null)
          .map(([k, v]) => ({ [k]: v })),
        { Password: password },
      ]
        .sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]))
        .map((e) => Object.values(e)[0])
        .join(""),
      "utf8"
    )
    .digest("hex");
};

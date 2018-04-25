import * as crypto from "crypto";

export const digest = (content: any) =>
  crypto
    .createHash("md5")
    .update(JSON.stringify(content))
    .digest("hex");

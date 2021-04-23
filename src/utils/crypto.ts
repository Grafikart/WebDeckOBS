/**
 * Does not work if the site is loaded over http
 */
import jsSHA from "jssha";

export async function nativeSha256(str: string): Promise<string> {
  const subtle =
    crypto.subtle || ((crypto as any).webkitSubtle as SubtleCrypto);
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return String.fromCharCode.apply(null, hashArray);
}

export function sha256(str: string): string {
  const sha256 = new jsSHA("SHA-256", "TEXT");
  sha256.update(str);
  return sha256.getHash("BYTES");
}

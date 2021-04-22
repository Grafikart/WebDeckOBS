export async function sha256(str: string): Promise<string> {
  const subtle =
    crypto.subtle || ((crypto as any).webkitSubtle as SubtleCrypto);
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return String.fromCharCode.apply(null, hashArray);
}

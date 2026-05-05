const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(num) {
  if (num === 0n) return CHARSET[0]

  let result = ''
  let n = num

  while (n > 0n) {
    const remainder = n % 62n
    result = CHARSET[Number(remainder)] + result
    n = n / 62n
  }

  return result
}

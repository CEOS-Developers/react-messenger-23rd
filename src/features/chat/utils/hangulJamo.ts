const HANGUL_COMPATIBILITY_JAMO_REGEX = /[\u3131-\u318e]/u;

export function isHangulCompatibilityJamo(char: string) {
  return HANGUL_COMPATIBILITY_JAMO_REGEX.test(char);
}

export function isHangulJamoOnlyText(text: string) {
  const units = Array.from(text.trim()).filter((char) => !/\s/u.test(char));

  return (
    units.length > 0 && units.every((char) => isHangulCompatibilityJamo(char))
  );
}

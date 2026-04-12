// src/utils/string.ts
const CHO_SUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const NORMALIZE_MAP: Record<string, string> = {
  'ㄲ': 'ㄱ', 'ㄸ': 'ㄷ', 'ㅃ': 'ㅂ', 'ㅆ': 'ㅅ', 'ㅉ': 'ㅈ'
};

export const getInitialConsonant = (text: string) => {
  if (!text) return '#';
  
  const firstChar = text.charAt(0);
  const uniVal = firstChar.charCodeAt(0);

  if (uniVal >= 44032 && uniVal <= 55203) {
    const choIndex = Math.floor((uniVal - 44032) / 588);
    const initial = CHO_SUNG[choIndex];
    return NORMALIZE_MAP[initial] || initial;
  }
  
  if (firstChar.match(/[a-zA-Z]/)) {
    return firstChar.toUpperCase();
  }
  
  return '#';
};
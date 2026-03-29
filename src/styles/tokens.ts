export const colors = {
  primary100: '#DDCDDE',
  primary200: '#C4A6C4',
  primary300: '#B592B6',
  primary400: '#A977AA',
  primary500: '#763B77',
  primary600: '#5A155B',
  primary700: '#441045',
  primaryAlpha10: 'rgba(106, 30, 107, 0.1)',

  secondary100: '#43D095',
  secondary200: '#069E6B',
  secondary300: '#007C58',

  white: '#FFFFFF',
  whiteAlpha90: 'rgba(255, 255, 255, 0.9)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',

  grey100: '#FCFCFC',
  grey200: '#F5F5F5',
  grey300: '#E3E3E3',
  grey400: '#C6C6C6',
  grey500: '#8E8E8E',
  grey600: '#555555',
  grey700: '#393939',
  grey800: '#1C1C1C',
} as const

export const device = {
  width: 375,
  height: 812,
} as const

export const typography = {
  h1_24_b: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '150%',
  },
  h1_24_sb: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  h2_22_b: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: '150%',
  },
  h2_22_sb: {
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  h3_18_b: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '150%',
  },
  h3_18_sb: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  b1_16_sb: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  b1_16_m: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%',
  },
  b2_14_b: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '150%',
  },
  b2_14_sb: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '150%',
  },
  b2_14_m: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '150%',
  },
  c1_12_r: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '150%',
  },
  c2_11_sb: {
  fontSize: '10px',
  fontWeight: 500,
  lineHeight: '15px',
},
  c2_11_r: {
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '150%',
  },
} as const
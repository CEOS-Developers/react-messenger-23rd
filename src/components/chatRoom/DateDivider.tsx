import { colors } from '@/styles/tokens'

type DateDividerProps = {
  date: string
}

function DateDivider({ date }: DateDividerProps) {
  return (
    <div
      className="flex w-full items-center gap-[12px]"
      style={{ padding: '8px 22px' }}
    >
      <div
        style={{
          flex: 1,
          height: '0.6px',
          background: colors.grey300,
        }}
      />
      <div
        style={{
          display: 'flex',
          minWidth: '64px',
          padding: '4px 12px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '99px',
          border: `0.6px solid ${colors.grey300}`,
          background: colors.whiteAlpha50,
        }}
      >
        <span
          style={{
            color: colors.grey500,
            fontSize: '11px',
            fontWeight: 600,
            lineHeight: '150%',
            textAlign: 'center',
          }}
        >
          {date}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          height: '0.6px',
          background: colors.grey300,
        }}
      />
    </div>
  )
}

export default DateDivider

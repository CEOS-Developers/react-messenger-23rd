import type { ReactNode } from 'react'

type PageFrameProps = {
  children: ReactNode
}

function PageFrame({ children }: PageFrameProps) {
  return (
    <div className="flex min-h-screen justify-center bg-[#f7f7f7]">
      <div
        className="flex h-[812px] w-[375px] flex-col overflow-hidden bg-white"
        style={{ boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.10)' }}
      >
        {children}
      </div>
    </div>
  )
}

export default PageFrame
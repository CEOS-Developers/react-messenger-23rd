export type ActiveStatus = 'active' | 'away' | 'sleeping'

export type User = {
  id: string
  name: string
  status: ActiveStatus
}

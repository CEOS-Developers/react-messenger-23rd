import usersData from '@/data/users.json'
import type { ActiveStatus, User } from '@/types/user'

import MemberItem from './MemberItem'

function MemberList() {
  const users = usersData as User[]

  return (
    <ul className="flex flex-col items-start gap-[8px] self-stretch">
      {users.map((user) => (
        <li key={user.id} className="w-full">
          <MemberItem
            name={user.name}
            status={user.status as ActiveStatus}
            isMe={user.id === 'me'}
          />
        </li>
      ))}
    </ul>
  )
}

export default MemberList

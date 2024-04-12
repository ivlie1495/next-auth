import UserInfo from '@/components/user-info'
import { currentUser } from '@/utils/user'

const ServerPage = async () => {
  const user = await currentUser()

  return <UserInfo label="Server Component" user={user} />
}

export default ServerPage

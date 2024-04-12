import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client'
import { PropsWithChildren } from 'react'
import FormError from '../form/error'

interface Props extends PropsWithChildren {
  allowedRole: UserRole
}

const RoleGate = ({ allowedRole, children }: Props) => {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return <>{children}</>
}

export default RoleGate

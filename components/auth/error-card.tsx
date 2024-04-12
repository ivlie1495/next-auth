import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import AuthCardWrapper from '@/components/auth/card-wrapper'

const AuthErrorCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Oops... Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-destructive h-6 w-6" />
      </div>
    </AuthCardWrapper>
  )
}

export default AuthErrorCard

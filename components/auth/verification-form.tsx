'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

import { verification } from '@/actions/verification'
import AuthCardWrapper from '@/components/auth/card-wrapper'
import FormSuccess from '@/components/form/success'
import FormError from '@/components/form/error'

const VerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing Token')
      return
    }

    if (!success && !error) {
      verification(token)
        .then((data) => {
          setSuccess(data.success)
          setError(data.error)
        })
        .catch(() => {
          setError('Something went wrong!')
        })
    }
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <AuthCardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && error && <FormError message={error} />}
      </div>
    </AuthCardWrapper>
  )
}

export default VerificationForm

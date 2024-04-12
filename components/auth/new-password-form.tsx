'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { newPassword } from '@/actions/new-password'
import AuthCardWrapper from '@/components/auth/card-wrapper'
import FormError from '@/components/form/error'
import FormSuccess from '@/components/form/success'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { newPasswordSchema } from '@/schemas/auth'
import { useSearchParams } from 'next/navigation'

type NewPasswordFormProps = z.infer<typeof newPasswordSchema>

const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<NewPasswordFormProps>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: NewPasswordFormProps) => {
    setSuccess('')

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setSuccess(data?.success)
          setError(data?.error)
        })
        .catch((error) => {
          setError(error.message || 'Something went wrong')
        })
    })
  }

  return (
    <AuthCardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  )
}

export default NewPasswordForm

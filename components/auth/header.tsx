interface Props {
  label: string
}

const AuthHeader = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">Auth</h1>
      <p>{label}</p>
    </div>
  )
}

export default AuthHeader

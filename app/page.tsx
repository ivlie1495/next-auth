import LoginButton from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold">Auth</h1>
        <p className="text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}

export default HomePage

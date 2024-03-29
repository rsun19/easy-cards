import { redirect } from 'next/navigation'

const Login = (): void => {
  redirect('/api/auth/signin')
}

export default Login

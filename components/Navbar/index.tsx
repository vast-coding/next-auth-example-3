import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { useAuthStore } from '~/store/useAuthStore'
import { useRouter } from 'next/router'

const ButtonHome = () => (
  <li>
    <Link href="/">Home</Link>
  </li>
)

const LinkRegister = () => (
  <li style={{ float: 'right' }}>
    <Link href="/auth/register">Register</Link>
  </li>
)

const LinkSignIn = () => (
  <li style={{ float: 'right' }}>
    <Link href="/auth/sign-in">Sign In</Link>
  </li>
)

type TLogout = { logout: () => void }
const ButtonLogOut = ({ logout }: TLogout) => (
  <li style={{ float: 'right' }}>
    <a onClick={logout}> Logout </a>
  </li>
)

export default function Navbar() {
  const router = useRouter()
  const authenticated = useAuthStore((state) => state.authenticated)
  const setAuthentication = useAuthStore((state) => state.setAuthentication)
  const setUser = useAuthStore((state) => state.setUser)
  const isRegisterPageActive = router.pathname === '/auth/register'

  const logout = () => {
    deleteCookie(`token`)
    setAuthentication(false)
    setUser({})
    router.push('/auth/signin')
  }

  let LinkButton = () => <ButtonLogOut logout={logout} />

  if (!authenticated && isRegisterPageActive) {
    LinkButton = () => <LinkSignIn />
  }
  if (!authenticated && !isRegisterPageActive) {
    LinkButton = () => <LinkRegister />
  }

  return (
    <header>
      <ul>
        <ButtonHome />
        <LinkButton />
      </ul>
    </header>
  )
}

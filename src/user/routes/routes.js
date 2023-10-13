import EmailEntryForm from "../components/organisms/EmailEntryForm/EmailEntryForm"
import LoginForm from "../components/organisms/LoginForm/LoginForm"
import LoginLayout from "../layouts/LoginLayout"
import OTPForm from "../components/organisms/OTPForm/OTPForm"
import RecoverPasswordForm from "../components/organisms/RecoverPasswordForm/RecoverPasswordForm"
import Home from "../components/pages/Home/Home"
import Feed from "../components/pages/Feed/Feed"
const publicRoutes = [
  {path: '/login', component: LoginForm, layout: LoginLayout},
  {path: '/email-entry', component: EmailEntryForm, layout: LoginLayout},
  {path: '/otp', component: OTPForm, layout: LoginLayout},
  {path: '/recover-password', component: RecoverPasswordForm, layout: LoginLayout},
]

const loggedInRoutes = [
  {path: '/', component: Home},
  {path: '/feed', component: Feed}
]

export {publicRoutes, loggedInRoutes}
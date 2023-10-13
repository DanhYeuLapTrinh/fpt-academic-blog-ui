import EmailEntryForm from "../components/organisms/EmailEntryForm/EmailEntryForm"
import LoginForm from "../components/organisms/LoginForm/LoginForm"
import OTPForm from "../components/organisms/OTPForm/OTPForm"
import RecoverPasswordForm from "../components/organisms/RecoverPasswordForm/RecoverPasswordForm"
import Home from "../components/pages/Home/Home"
import Feed from "../components/pages/Feed/Feed"
import News from "../components/pages/News/News"
const publicRoutes = [
  {path: '/login', component: LoginForm},
  {path: '/email-entry', component: EmailEntryForm},
  {path: '/otp', component: OTPForm},
  {path: '/recover-password', component: RecoverPasswordForm},
]

const loggedInRoutes = [
  {path: '/', component: Home},
  {path: '/feed', component: Feed},
  {path: '/news', component: News}
]
export {publicRoutes, loggedInRoutes}
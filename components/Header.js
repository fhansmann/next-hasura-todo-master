import { withRouter } from "next/router"
import LogoutBtn from "./Auth/Logout"

const Header = () => (
  <div class='flex justify-between transparent '>
    <p class='font-bold text-xl m-4'>Otter</p>
    <LogoutBtn />
  </div>
)

export default withRouter(Header)

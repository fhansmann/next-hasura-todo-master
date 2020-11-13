import Router from "next/router"

const LogoutBtn = () => (
  <button
    class='bg-transparent text-black font-semibold py-2 px-4'
    onClick={() => {
      Router.push("/api/logout")
    }}
  >
    Log Out
  </button>
)

export default LogoutBtn

import Header from "../components/Header"
import Login from "../components/Auth/Login"

import { useFetchUser } from "../lib/user"
import { withApollo } from "../lib/withApollo"
import TodoInput from "../components/Todo/TodoInput"
import TodoPrivateList from "../components/Todo/TodoPrivateList"
import TodoPublicList from "../components/Todo/TodoPublicList"

const IndexPage = () => {
  const { user, loading } = useFetchUser()
  if (loading) {
    return (
      <div class='fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center'>
        <div class='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }
  if (!loading && !user) {
    return <Login />
  }
  return (
    <div className="background-full">
            <Header />
      <div class="flex mb-4">
  <div class="w-2/3">
  <TodoInput />
      <TodoPrivateList />
  </div>
  <div class="w-1/3 " >
  <TodoPublicList />
  </div >
</div>
    </div>
  )
}

export default withApollo({ ssr: true })(IndexPage)

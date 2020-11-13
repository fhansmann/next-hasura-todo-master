import Router from "next/router"

const Login = () => {
  return (
    <div className="background">
    <div class='flex h-screen'>
      <div class="my-auto mx-32">
      <div class='lg:text-center bg-gray-300 p-3 rounded-lg w-2/3'>
        <div class='font-bold text-xl mb-2'>
          Welcome to Otter, the coolest to-do list!
        </div>
        <p class='text-gray-700 text-base mb-2'>
          Otter let's you safely create a to-do list and share selected items publicly in the otter feed.
        </p>
        <p class='text-gray-700 text-base mb-4'>Login to continue!</p>
        <button
          class='bg-transparent text-black font-semibold py-2 px-4 border border-black rounded'
          onClick={() => {
            Router.push("/api/login")
          }}
        >
          Login
        </button>
        <p class='text-gray-600 text-base mt-8 italic'>Built with Next.js, Auth0, GraphQL and Hasura</p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Login

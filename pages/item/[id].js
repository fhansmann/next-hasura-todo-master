import { Image } from "@chakra-ui/react"
import auth0 from "../../lib/auth0"

export async function getServerSideProps({ req, res, params }) {
  const { id } = params
  const session = await auth0.getSession(req)

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/login"
    })
    res.end()
    return
  }

  const resp = await fetch("https://todoapp2020.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_SECRET
    },
    body: JSON.stringify({
      query: `
        query Page($id: Int!) {
            todos(where: {id: {_eq: $id}}) {
              title
              id
            } 
          }`,
      variables: { id }
    })
  })
  const { data } = await resp.json()
  const { todos } = data
  return { props: { todos } }
}

const Item = ({ todos }) => {
  return todos.map((todo) => (
    <div className='background-full'>
      <div class='flex justify-center'>
        <div
          class='max-w-sm rounded overflow-hidden shadow-lg bg-white'
          key={todos.id}
        >
          <div class='px-6 py-4'>
            <div class='font-bold text-xl mb-2'>Title: {todo.title}</div>
            <div class='font-bold text-xl mb-2'>Id: {todo.id}</div>
            <p class='text-gray-800 text-base'>
              Note: No details about the item here..BUT! This page is generated
              using Next.js dynamic routing capabilities! Much wow!
            </p>
            <p class='text-gray-600 text-base mt-4'>
              Random picture from Unsplash below:
            </p>
          </div>
          <img
            class='w-full'
            src='https://source.unsplash.com/random'
            alt='Random Pic'
          ></img>
        </div>
      </div>
    </div>
  ))
}

export default Item

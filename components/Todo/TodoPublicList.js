import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import TodoPublicItem from "./TodoPublicItem"

const GET_MY_PUBLIC_TODOS = gql`
  query getMyTodos {
    todos(
      where: { is_completed: { _eq: true } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`

const TodoPublicList = (props) => {
  const { todos } = props
  const todoList = []

  todos.forEach((todo, index) => {
    todoList.push(<TodoPublicItem key={index} index={index} todo={todo} />)
  })

  return (
    <div>
      <div class='flex flex-col'>
        <div class='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div class='py-2 align-middle inline-block w-auto sm:px-6 lg:px-8 ml-8'>
            <div class='shadow overflow-hidden border-b border-gray-300 sm:rounded-lg bg-gray-200'>
              <table class='min-w-full divide-y divide-gray-300'>
                <thead>
                  <tr>
                    <th class='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Item
                    </th>
                    <th class='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Created At
                    </th>
                  </tr>
                </thead>
                {todoList}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TodoPublicListQuery = () => {
  const { loading, error, data } = useQuery(GET_MY_PUBLIC_TODOS)

  if (loading) {
    return (
      <div class='fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center'>
        <div class='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }
  if (error) {
    console.error(error)
    return <div>Error!</div>
  }
  return <TodoPublicList todos={data.todos} />
}

export default TodoPublicListQuery
export { GET_MY_PUBLIC_TODOS }

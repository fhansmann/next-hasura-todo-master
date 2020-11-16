import { useMutation } from "@apollo/react-hooks"
import { format, parseISO } from "date-fns"
import gql from "graphql-tag"
import { Switch } from "@chakra-ui/react"
import Link from "next/link";

import { GET_MY_TODOS } from "./TodoPrivateList"

const TodoItem = ({ todo }) => {
  const REMOVE_TODO = gql`
    mutation removeTodo($id: Int!) {
      delete_todos(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `

  const [removeTodoMutation] = useMutation(REMOVE_TODO)

  const removeTodo = (e) => {
    e.preventDefault()
    e.stopPropagation()
    removeTodoMutation({
      variables: { id: todo.id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS })
        const newTodos = existingTodos.todos.filter((t) => t.id !== todo.id)
        cache.writeQuery({
          query: GET_MY_TODOS,
          data: { todos: newTodos }
        })
      }
    })
  }

  const TOGGLE_TODO = gql`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `

  const [toggleTodoMutation] = useMutation(TOGGLE_TODO)

  const toggleTodo = () => {
    toggleTodoMutation({
      variables: { id: todo.id, isCompleted: !todo.is_completed },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_MY_TODOS })
        const newTodos = existingTodos.todos.map((t) => {
          if (t.id === todo.id) {
            return { ...t, is_completed: !t.is_completed }
          } else {
            return t
          }
        })
        cache.writeQuery({
          query: GET_MY_TODOS,
          data: { todos: newTodos }
        })
      }
    })
  }

  const formattedTimeStamp = format(
    parseISO(todo.created_at),
    "MMM d 'AT' h:m a"
  ).toUpperCase()

  return (
    <tbody class='bg-white divide-y divide-gray-200'>
      <tr>
        <td class='px-6 py-4 whitespace-no-wrap'>
          <div class='text-sm leading-5 font-medium text-gray-900'>
            {todo.title}
          </div>
        </td>
        <td class='px-6 py-4 whitespace-no-wrap'>
          <span class='px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-gray-800'>
            {formattedTimeStamp}
          </span>
        </td>
        <td class='px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium'>
        <Switch colorScheme="red" onChange={toggleTodo} isChecked={todo.is_completed}/>
        </td>
        <td class='px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium'>
        <Link href="/item/[id]" as={`/item/${todo.id}`}>
                <a class='text-teal-500 hover:text-teal-700'>
                  Details
                </a>
        </Link>
        </td>
        <td class='px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium'>
          <button
            onClick={removeTodo}
            class='text-indigo-600 hover:text-indigo-900'
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  )
}

export default TodoItem

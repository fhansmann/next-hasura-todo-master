import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useForm } from "react-hook-form"
import { GET_MY_TODOS } from "./TodoPrivateList"
import { useFetchUser } from "../../lib/user"

const ADD_TODO = gql`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
        user_id
      }
    }
  }
`

const TodoInput = ({ isPublic = false }) => {
  const { user } = useFetchUser()
  const { handleSubmit, register, errors, reset } = useForm()
  const onSubmit = (value) => {
    const { input: toDo } = value
    addTodo({ variables: { todo: toDo, isPublic } })
    reset()
  }

  const updateCache = (cache, { data }) => {
    // Fetch the todos from the cache
    const existingTodos = cache.readQuery({
      query: GET_MY_TODOS
    })

    // Add the new todo to the cache
    const newTodo = data.insert_todos.returning[0]
    cache.writeQuery({
      query: GET_MY_TODOS,
      data: { todos: [newTodo, ...existingTodos.todos] }
    })
  }

  const [addTodo] = useMutation(ADD_TODO, {
    update: updateCache
  })

  return (
    <div class='w-full max-w-xs m-8 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <p class='text-base leading-6 text-teal-600 font-semibold tracking-wide mb-8'>
        Hello, {user.nickname}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name='input'
          placeholder='What needs to be done?'
          ref={register({
            required: "Required"
          })}
          class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
        {errors.input && errors.input.message}

        <button
          type='submit'
          class='bg-gray-700 hover:bg-gray-800 text-white font-semi-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default TodoInput

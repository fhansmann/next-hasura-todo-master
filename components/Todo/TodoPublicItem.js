import { format, parseISO } from "date-fns"

const TodoPublicItem = ({ todo }) => {

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
        <td class='px-6 py-4 whitespace-no-wrap'>
          <div class='text-sm leading-5 font-medium text-gray-900'>
            {todo.user.name}
          </div>
        </td>
      </tr>
    </tbody>
  )
}

export default TodoPublicItem

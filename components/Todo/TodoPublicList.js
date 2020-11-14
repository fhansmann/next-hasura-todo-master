import { useSubscription, gql } from "@apollo/client"

import TodoPublicItem from "./TodoPublicItem"

 const NOTIFY_NEW_PUBLIC_TODOS = gql`
  subscription notifyNewPublicTodos {
    todos (where: { is_completed: { _eq: true}}, order_by: {created_at: desc }) {
      title
      id
      created_at
      user {
      name
    }
    }
  }
 `;

const TodoPublicListSubscription = () => {
  const { loading, error, data } = useSubscription(NOTIFY_NEW_PUBLIC_TODOS);
  if (loading) {
    return (
      <div class='fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center'>
      <div class='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
    </div>
    );
  }
  if (error) {
    return <span>Error</span>;
  }
  return <TodoPublicList todos={data.todos} />;
};

const TodoPublicList = (props) => {
  const { todos } = props
  const todoList = []

  todos.forEach((todo, index) => {
    todoList.push(<TodoPublicItem key={index} index={index} todo={todo} />)
  })

  return (
    <div>
      <div class='flex flex-col'>
        <div class='my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
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
                    <th class='px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      Creator
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

export default TodoPublicListSubscription


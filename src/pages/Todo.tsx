import TodoItem from '../components/TodoItem';
import { Item } from '../ts/interfaces';
import { useAppContext } from '../context';
import Form from '../components/Form';
import Alert from '../components/Alert';

const Todo = () => {
  const { todo, removeAll } = useAppContext();

  return (
    <div className='section-center section'>
      <h2 className='title'>React TS assistant</h2>
      <Alert />
      <section className='main-container'>
        <h2>Task List</h2>
        <Form />
        <div className='todo-list'>
          <ul className='todo-container'>
            {todo.map((item: Item) => {
              return <TodoItem key={item.id} item={item} />;
            })}
          </ul>
        </div>
        {todo.length > 0 && (
          <button className='remove-items' onClick={removeAll}>
            remove all
          </button>
        )}
      </section>
    </div>
  );
};

export default Todo;

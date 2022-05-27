import React from 'react';
import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import { Item } from '../ts/interfaces';
import { useAppContext } from '../context';

const Todo = () => {
  const {
    showAlert,
    alertMessege,
    todo,
    ItemValue,
    displayAlert,
    removeAll,
    handleForm,
  } = useAppContext();

  const [itemValue, setItemValue] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (itemValue && itemValue.trim() !== '') {
      handleForm(itemValue);
    } else {
      displayAlert('Please Enter Task', 'danger');
    }
    setItemValue('');
  };
  useEffect(() => {
    setItemValue(ItemValue);
  }, [ItemValue]);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todo));
    if (alertMessege.messege !== 'Editing...') {
      let timeOut = setTimeout(() => {
        // setShowAlert(false);
      }, 1500);
      return () => clearTimeout(timeOut);
    }
  }, [alertMessege.messege, todo]);

  return (
    <div className='section-center section'>
      <h2 className='title'>React assistant</h2>
      <div className='alert-container'>
        {showAlert && (
          <div className={`alert-box ${alertMessege.type}`}>
            <p>{alertMessege.messege}</p>
          </div>
        )}
      </div>
      <section className='main-container'>
        <h2>Task List</h2>
        <form onSubmit={handleSubmit} className='form-container'>
          <input
            onChange={(e) => setItemValue(e.target.value)}
            type='text'
            value={itemValue}
            className='input-control'
            placeholder='Type something...'
            maxLength={25}
          />
        </form>

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

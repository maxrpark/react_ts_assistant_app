import React, { useContext, useReducer, useEffect } from 'react';
import useTodoReducer from './todoReducer';
import { Item } from './ts/interfaces';
const getLocalStorage = () => {
  let todoList = localStorage.getItem('todoList');
  if (todoList) {
    return (todoList = JSON.parse(localStorage.getItem('todoList') as string)); // fix
  } else {
    return [];
  }
};

type Props = {
  children: React.ReactNode;
};

interface AlertMessege {
  messege: string;
  type: string;
}

interface AppInterface {
  todo: [] | Item[];
  showAlert: boolean;
  isEditing: boolean;
  alertMessege: AlertMessege;
  ItemID: string;
  ItemValue: string;
  removeAll: () => void;
  completeItem: (id: string) => void;
  handleForm: (itemValue: string) => void;
  editItem: (id: string) => void;
  deleteItem: (id: string) => void;
  displayAlert: (messege: string, type: string) => void;
}

export interface InitialState {
  todo: [] | Item[];
  showAlert: boolean;
  isEditing: boolean;
  alertMessege: AlertMessege;
  ItemID: string;
  ItemValue: string;
}

const InitialState = {
  todo: getLocalStorage(),
  showAlert: false,
  isEditing: false,
  ItemID: '',
  ItemValue: '',
  alertMessege: {
    messege: '',
    type: '',
  },
};
const AppContext = React.createContext({} as AppInterface);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    useTodoReducer,
    InitialState as InitialState
  );

  // Completed
  const completeItem = (id: string) => {
    dispatch({ type: 'TOOGLE_COMPLETE', payload: id });

    state.todo.map((item: Item) => {
      if (item.id === id) {
        if (!item.isComplete) {
          displayAlert('Task Completed', 'success');
        }
      }
    });
  };
  // EDITING
  const editItem = (id: string) => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
    displayAlert('Editing...', 'warning');
  };
  const deleteItem = (id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
    displayAlert('Task Deleted', 'danger');
  };

  // REMOVE ALL
  const removeAll = () => {
    dispatch({ type: 'REMOVE_ALL' });
    displayAlert('All items removed', 'danger');
  };
  // handleForm
  const handleForm = (itemValue: string) => {
    if (state.isEditing && itemValue) {
      dispatch({ type: 'EDITING_ITEM', payload: itemValue });
      displayAlert('Task Edited', 'success');
    } else {
      dispatch({ type: 'ADD_ITEM', payload: itemValue });
      displayAlert('Task Added', 'success');
    }
  };

  // ALERT
  const displayAlert = (messege: string, type: string) => {
    const alert = {
      messege,
      type,
    };
    dispatch({ type: 'DISPLAY_ALERT', payload: alert });
  };

  useEffect(() => {
    //  localStorage.setItem('todoList', JSON.stringify(state.todo));
    if (state.alertMessege.messege !== 'Editing...') {
      let timeOut = setTimeout(() => {
        dispatch({ type: 'HIDE_ALERT' });
      }, 1500);
      return () => clearTimeout(timeOut);
    }
  }, [state.alertMessege.messege, state.todo]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        completeItem,
        editItem,
        deleteItem,
        displayAlert,
        removeAll,
        handleForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export const useAppContext = () => {
  return useContext(AppContext);
};

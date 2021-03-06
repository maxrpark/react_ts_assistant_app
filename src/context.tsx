import React, { useContext, useReducer, useEffect } from 'react';
import useTodoReducer from './todoReducer';
import { Item, AlertMessege } from './ts/interfaces';
import { actionType } from './ts/reducer/actionType';
const getLocalStorage = () => {
  let todoList = localStorage.getItem('todoListTs');
  if (todoList) {
    return (todoList = JSON.parse(
      localStorage.getItem('todoListTs') as string
    )); // fix
  } else {
    return [];
  }
};

type Props = {
  children: React.ReactNode;
};

interface AppInterface {
  todo: [] | Item[];
  showAlert: boolean;
  isEditing: boolean;
  alertMessege: AlertMessege;
  ItemID: string;
  ItemValue: string;
  removeAll: () => void;
  formInput: (e: any) => void;
  completeItem: (id: string) => void;
  handleForm: (e: React.FormEvent) => void;
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

  // CHANGE INPUT VALUE
  const formInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actionType.UPDATE_INPUT, payload: e.target.value });
  };

  // FORMSUBMIT
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.ItemValue && state.ItemValue.trim() !== '') {
      if (state.isEditing && state.ItemValue) {
        dispatch({ type: actionType.EDITING_ITEM, payload: state.ItemValue });
        displayAlert('Task Edited', 'success');
      } else {
        dispatch({ type: actionType.ADD_ITEM, payload: state.ItemValue });
        displayAlert('Task Added', 'success');
      }
    } else {
      displayAlert('Please Enter Task', 'danger');
    }
  };

  // TOOGLE COMPLETE
  const completeItem = (id: string) => {
    dispatch({ type: actionType.TOOGLE_COMPLETE, payload: id });

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
    dispatch({ type: actionType.EDIT_ITEM, payload: id });
    displayAlert('Editing...', 'warning');
  };
  const deleteItem = (id: string) => {
    dispatch({ type: actionType.DELETE_ITEM, payload: id });
    displayAlert('Task Deleted', 'danger');
  };

  // REMOVE ALL
  const removeAll = () => {
    dispatch({ type: actionType.REMOVE_ALL });
    displayAlert('All items removed', 'danger');
  };

  // ALERT
  const displayAlert = (messege: string, type: string) => {
    const alert = {
      messege,
      type,
    };
    dispatch({ type: actionType.DISPLAY_ALERT, payload: alert });
  };

  useEffect(() => {
    localStorage.setItem('todoListTs', JSON.stringify(state.todo));
    if (state.alertMessege.messege !== 'Editing...') {
      let timeOut = setTimeout(() => {
        dispatch({ type: actionType.HIDE_ALERT });
      }, 1500);
      return () => clearTimeout(timeOut);
    }
  }, [state.alertMessege.messege, state.todo]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        completeItem,
        formInput,
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

import { InitialState } from './context';
import { Item } from './ts/interfaces';
const useTodoReducer = (state: InitialState, action: any) => {
  switch (action.type) {
    case 'DISPLAY_ALERT':
      return { ...state, showAlert: true, alertMessege: action.payload };
    case 'HIDE_ALERT':
      return { ...state, showAlert: false };
    case 'REMOVE_ALL':
      return { ...state, todo: [], ItemValue: '' };
    case 'DELETE_ITEM':
      const todoList = state.todo.filter(
        (item: Item) => item.id !== action.payload
      );
      return { ...state, todo: todoList, isEditing: false, ItemValue: '' };
    case 'EDIT_ITEM':
      const specificItem = state.todo.find(
        (item: Item) => item.id === action.payload
      );
      return {
        ...state,
        ItemValue: specificItem!.value,
        isEditing: true,
        ItemID: action.payload,
      };
    case 'EDITING_ITEM':
      let tempList = state.todo.map((item: Item) => {
        if (item.id === state.ItemID) {
          return { ...item, value: action.payload };
        }
        return item;
      });

      return {
        ...state,
        todo: tempList,
        isEditing: false,
        ItemID: '',
        ItemValue: '',
      };
    case 'ADD_ITEM':
      const todoItem = {
        id: new Date().getTime().toString(),
        value: action.payload,
        isComplete: false,
      };
      return {
        ...state,
        todo: [todoItem, ...state.todo],
        isEditing: false,
        ItemID: '',
        ItemValue: '',
      };
    case 'TOOGLE_COMPLETE':
      const completedList = state.todo.map((item: Item) => {
        if (item.id === action.payload) {
          if (!item.isComplete) {
          }
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      });
      return { ...state, todo: completedList, isEditing: false, ItemValue: '' };
    default:
      return state;
  }
};

export default useTodoReducer;

import { atom } from "recoil";

export const TRELLO_TODO = "TRELLO_TODO";

const localStorageTodo = localStorage.getItem(TRELLO_TODO) || "{}";

const parsedLocalStorageTodo = JSON.parse(localStorageTodo);

export const secondToDoState = atom({
  key: "toDo",
  default: parsedLocalStorageTodo,
});

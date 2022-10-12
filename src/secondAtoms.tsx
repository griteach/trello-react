import { atom } from "recoil";

export const TRELLO_TODO = "toDo";

const localStorageTodo: string = localStorage.getItem(TRELLO_TODO) || "{}";

const parsedLocalStorageTodo = JSON.parse(localStorageTodo);

interface ISecondToDoState {
  [key: string]: string[];
}

export const secondToDoState = atom<ISecondToDoState>({
  key: "toDo",
  default: {},
});

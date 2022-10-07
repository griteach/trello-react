import { atom } from "recoil";

export const TRELLO_TODO = "TRELLO_TODO";

const localStorageTodo: string = localStorage.getItem(TRELLO_TODO) || "{}";

const parsedLocalStorageTodo = JSON.parse(localStorageTodo);

export const secondToDoState = atom({
  key: "toDo",
  default: {
    to_do: ["a", "b", "c", "d", "e"],
    doing: [],
    done: [],
  },
});

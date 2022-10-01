import { atom } from 'recoil';

export const secondToDoState = atom({
    key:"toDo",
    default:["a","b","c","d","e","f","g","h"],
});
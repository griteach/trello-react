import {atom} from "recoil";


export interface ITodo{
    id:number;
    text:string;
}

interface IToDoState{
    [key:string]:ITodo[];
}

export const saveDataToLocaleStorage = (myData:Object) => {
    //localeStorage 저장하기
    window.localStorage.setItem("myToDo", JSON.stringify(myData));

    

}


const myStorage = JSON.parse(window.localStorage.getItem("myToDo")!);
export const toDoState = atom<IToDoState>({
    key:"toDo",
    default: {
        "To Do": [...myStorage["To Do"]],
        doing: [...myStorage["doing"]],
        done: [...myStorage["done"]],
    },
})



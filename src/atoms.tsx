import {atom} from "recoil";


export interface ITodo{
    id:number;
    text:string;
}

interface IToDoState{
    [key:string]:ITodo[];
}

interface IBoardIdState{
    boardId:string[];
}

export const boardIdState = atom<IBoardIdState>({
    key:"boardId",
    default: {
        boardId:[],
                
    },
})

//localeStorage 저장하기
export const saveDataToLocaleStorage = (myData:Object) => {
    window.localStorage.setItem("myToDo", JSON.stringify(myData));

}
//localestorage 데이터 불러오기
const loadDataFromLocaleStorage = (loadedData:Object)=>{
    const myStorage = JSON.parse(window.localStorage.getItem("myToDo")!);

    // return [myStorage[boardId]];
}


export const toDoState = atom<IToDoState>({
    key:"toDo",
    default: {
        //각각 아이디에 맞게 불러올건데, 여기도 사용자가 입력한 리스트의 이름을 불러오기.
        // "To Do": [],
        // doing: [],
        // done: [],
        
    },
})



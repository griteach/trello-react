
import {Droppable} from "react-beautiful-dnd";
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import {useForm} from 'react-hook-form';
import { ITodo, saveDataToLocaleStorage, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';


const Wrapper = styled.div`
  padding-top:10px;
  width:200px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height:200px;
  display: flex;
  flex-direction: column;
`;



const Area = styled.div<IArea>`
    background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis? "#b2bec3": "transparent"};
    flex-grow: 1;
    padding:20px;
    transition: background-color 0.3s ease-in-out;

`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom:10px;
    font-size: 18px;
`

interface IBoardProps{
    toDos:ITodo[],
    boardId:string,
}
interface IArea {
    isDraggingOver:boolean,
    isDraggingFromThis:boolean,
}


interface IForm{
    toDo:string,
}

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    input{
        box-sizing: border-box;
        width: 70%;
        border: none;
        border-radius: 5px;
        padding:4px;
        background-color: #00cec9;
        
        ::placeholder{
            color:white;
            text-align: center;
        }
        &:hover{
            
        }
        &:focus{
            
            outline-color: #ffeaa7;
        }
    }
`;



function Board({toDos, boardId}:IBoardProps){

    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    
    const onValid = ({toDo}:IForm)=>{
        const newToDo = {
            id:Date.now(),
            text:toDo,
        }
        setToDos(allBoards => {
            const myTodoData = {
                ...allBoards,
                [boardId]:[
                    newToDo,
                    ...allBoards[boardId]
                ]

            };
            
            saveDataToLocaleStorage(myTodoData);
            
            return {
                ...allBoards,
                [boardId]:[
                    newToDo,
                    ...allBoards[boardId]
                ]

            }
        })
        setValue("toDo", "");
    }
    

    return(
    <Wrapper>
        <Title>{boardId}</Title>
        
        <Form onSubmit={handleSubmit(onValid)} >
            <input {...register("toDo", {
                required:true,
            })} type="text" placeholder={`Write it on ${boardId}`} />
        </Form>

        

        <Droppable droppableId={boardId}>
      {(magic, snapshot) => 
      <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
        
      {toDos.map((toDo, index) => 
      <DragabbleCard key={toDo.id} toDoText={toDo.text} toDoId={toDo.id} index={index} />
        )}
        {magic.placeholder}
        
        </Area>}
        
    </Droppable>
    </Wrapper>
    
    )
}

export default Board;
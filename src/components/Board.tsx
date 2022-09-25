import { useRef } from 'react';
import {Droppable} from "react-beautiful-dnd";
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';


const Wrapper = styled.div`
  padding-top:10px;
  
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height:200px;
  display: flex;
  flex-direction: column;
`;


interface IArea {
    isDraggingOver:boolean,
    isDraggingFromThis:boolean,
}

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
    toDos:string[],
    boardId:string,
}

function Board({toDos, boardId}:IBoardProps){

    const inputRef = useRef<HTMLInputElement>(null);
    const onClick = () =>{
        inputRef.current?.focus();
    }

    return(
    <Wrapper>
        <Title>{boardId}</Title>
        <input ref={inputRef} placeholder="grab me" />
        <button onClick={onClick}>Click Me</button>

        <Droppable droppableId={boardId}>
      {(magic, snapshot) => 
      <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
        
      {toDos.map((toDo, index) => 
      <DragabbleCard key={toDo} toDo={toDo} index={index} />
        )}
        {magic.placeholder}
        
        </Area>}
        
    </Droppable>
    </Wrapper>
    
    )
}

export default Board;
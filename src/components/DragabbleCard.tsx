import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import styled from 'styled-components';


interface ICard {
    isDragging:boolean,
}

const Card = styled.div<ICard>`
  border-radius: 5px;
  padding:10px 10px;
  background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  transition: background-color 0.5s ease-in-out;
  box-shadow: ${props => props.isDragging? "0px 5px 10px rgba(0,0,0,0.5)":"none"};
  margin:2px 0px;
  text-align: center;
`;

interface IDragabbleCardProps{
    toDoId:number;
    toDoText:string;
    index:number;
}


function DragabbleCard({toDoId, toDoText, index}:IDragabbleCardProps){

    return(
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
          {(magic, snapshot) => 
          <Card 
          isDragging={snapshot.isDragging}
          ref={magic.innerRef} 
          {...magic.draggableProps} 
          {...magic.dragHandleProps} >
            
            {toDoText}
            </Card>}
        </Draggable>
    )
}

export default React.memo(DragabbleCard);
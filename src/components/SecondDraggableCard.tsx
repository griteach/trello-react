import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDraggalbeCardProps {
    
    toDo:string,
    index:number,
}


const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  margin-bottom: 5px;
`;


function SecondDraggalbeCard ({toDo, index}:IDraggalbeCardProps) {

    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic)=>
            <Card 
                ref={magic.innerRef}
                {...magic.draggableProps}
                {...magic.dragHandleProps}>
                    {toDo}
            </Card>}
        </Draggable>
    )
}

export default React.memo(SecondDraggalbeCard);
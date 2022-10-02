
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { secondToDoState } from './secondAtoms';



const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width:100%;
    height:100vh;
    margin:0 auto;
    justify-content: center;
    align-items: center;
`

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width:100%;
    
    
`;

const Board = styled.div`
    background-color: ${props => props.theme.boardColor};
    padding: 20px;
    border-radius: 15px;
    min-height: 100px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  margin-bottom: 5px;
`;
const toDos = ["a","b","c","d","e","f","g","h"];

function SecondApp(){

    const [toDos, setTodos] = useRecoilState(secondToDoState);

    const onDragEnd = ({destination, source}:DropResult) => {
        console.log(destination);
        console.log(source);
        

    }

    return <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
        <Boards>
        <Droppable droppableId="one">
            {(magic)=>
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                    
                        {toDos.map((toDo, index) => 
                        <Draggable key={index} draggableId={toDo} index={index}>
                            {(magic)=>
                            <Card 
                                ref={magic.innerRef}
                                {...magic.draggableProps}
                                {...magic.dragHandleProps}>
                                    {toDo}
                            </Card>}
                        </Draggable>)}
                    {magic.placeholder}
                </Board>
                
            
        }

        </Droppable>
        
        </Boards>
        </Wrapper>
    </DragDropContext>

}

export default SecondApp;
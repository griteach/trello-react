
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import SecondDraggalbeCard from './components/SecondDraggableCard';
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

const toDos = ["a","b","c","d","e","f","g","h"];

function SecondApp(){

    const [toDos, setTodos] = useRecoilState(secondToDoState);

    const onDragEnd = ({draggableId, destination, source}:DropResult) => {
        if(!destination) return;
        setTodos((oldToDos) => {
            const copyToDos = [...oldToDos];

            copyToDos.splice(source.index, 1);
            copyToDos.splice(destination?.index, 0, draggableId);
            return copyToDos;
        })


    }

    return <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
        <Boards>
        <Droppable droppableId="one">
            {(magic)=>
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                    
                        {toDos.map((toDo, index) => 
                            <SecondDraggalbeCard key={toDo} toDo={toDo} index={index} />
                        )}
                    {magic.placeholder}
                </Board>
                
            
        }

        </Droppable>
        
        </Boards>
        </Wrapper>
    </DragDropContext>

}

export default SecondApp;


import { DragDropContext, DropResult }from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { saveDataToLocaleStorage, toDoState } from './atoms';
import Board from './components/Board';
import CreateBoard from './components/CreateBoard';




const BoardWrapper = styled.div`
  display: flex;
  max-width: 680px;
  width:100%;
  margin:0 auto;
  justify-content: center;
  align-items: center;
  height:50vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100vw;
  height:100vh;
  margin:0 auto;
  
`;

const Boards = styled.div`
  display: grid;
  width:100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  
`


const toDos = ["a", "b", "c", "d", "e", "f"]


function App() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  //드래그가 끝났을 때 실행되는 함수.
  const onDragEnd = (info:DropResult) => {
    console.log(info);
    const {destination, draggableId, source} = info;
    
    if(destination?.droppableId == source.droppableId){
      // same board movement.
      setTodos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];


        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]:boardCopy,
        };
      })
    }else{
      setTodos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination!.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination!.index, 0, taskObj);

        const toDoData = {
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination!.droppableId]:destinationBoard,

        };
        saveDataToLocaleStorage(toDoData);




        return toDoData;
      })
    }
    
  };

return (
<DragDropContext onDragEnd={onDragEnd}>
  <Wrapper>
    <CreateBoard></CreateBoard>
    <BoardWrapper>
      <Boards>
        {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
      </Boards>
    </BoardWrapper>
  </Wrapper>

</DragDropContext>);
  
}

export default App;

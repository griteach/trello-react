

import { DragDropContext, DropResult }from "react-beautiful-dnd";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './components/Board';




const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width:100%;
  margin:0 auto;
  justify-content: center;
  align-items: center;
  height:100vh;
  background-color: ${(props) => props.theme.bgColor};
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
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]:boardCopy,
        };
      })
    }else{
      setTodos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination!.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination!.index, 0, draggableId);
        
        return {
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination!.droppableId]:destinationBoard,

        };
      })
    }
    
  };

  //한 번에 처리하기 if 두번안쓰고
  // const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
  //   if (!destination) return;
  //   setToDos((allBoards) => {
  //   const copyToDos: IToDoState = {};
  //   Object.keys(allBoards).forEach((toDosKey) => {
  //   copyToDos[toDosKey] = [...allBoards[toDosKey]];
  //   });
  //   copyToDos[source.droppableId].splice(source.index, 1);
  //   copyToDos[destination.droppableId].splice(
  //   destination.index,
  //   0,
  //   draggableId
  //   );
  //   return copyToDos;
  //   });
  //   };

return (<DragDropContext onDragEnd={onDragEnd}>
  <Wrapper>
    <Boards>
      {Object.keys(toDos).map(boardId => <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />)}
    </Boards>
  </Wrapper>

</DragDropContext>);
  
}

export default App;

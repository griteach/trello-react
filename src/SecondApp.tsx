import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SecondBoard from "./components/SecondBoard";

import { secondToDoState } from "./secondAtoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  grid-gap: 1rem;
`;

function SecondApp() {
  const [toDos, setTodos] = useRecoilState(secondToDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;

    if (destination?.droppableId === source.droppableId) {
      setTodos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        const newBoards = {
          //기존의 oldToDos를 일단 다 넣어주고

          ...oldToDos,
          [source.droppableId]: boardCopy,
          //바꿀 녀석을 다시 넣어주면 아래의 바뀔 녀석은 새롭게 대체될것.
        };
        return newBoards;
      });
    }

    // setTodos((oldToDos) => {
    //   const copyToDos = {...oldToDos};

    //
    //   return copyToDos;
    // });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <SecondBoard
              key={boardId}
              boardId={boardId}
              toDos={toDos[boardId]}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default SecondApp;

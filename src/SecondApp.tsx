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

const AddBoardButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 25px;
  position: absolute;
  bottom: 50px;
  right: 50px;
  &:hover {
    background-color: blue;
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
  }
`;

function SecondApp() {
  const [toDos, setTodos] = useRecoilState(secondToDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;

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

    if (destination?.droppableId !== source.droppableId) {
      setTodos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        boardCopy.splice(source.index, 1);

        const makeNewBoard = [...oldToDos[destination.droppableId]];
        makeNewBoard.splice(destination?.index, 0, draggableId);

        const newBoard = {
          //기존에 갖고 있던 모든 값을 일단 넣어주고,
          ...oldToDos,

          //새롭게 넣고 싶은 값을 아래처럼 넣어주는데, 키 값에 배열의 형태로 넣어주면, 알아서 값을 넣어준다 .즉, 변수처럼 사용하게 된다.
          [source.droppableId]: boardCopy,

          //마찬가지로 추가로 값을 넣을 때, 키 값에 배열의 형태를 넣어주면, 변수처럼 사용할 수 있게 된다.
          [destination.droppableId]: makeNewBoard,
        };

        return newBoard;
      });
    }
  };

  const addBtnClicked = () => {
    const newBoardName = prompt("보드 이름을 입력해 주세요.") || "";
    setTodos((oldToDos) => {
      return {
        ...oldToDos,
        [newBoardName]: [],
      };
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {/* atom에 있는 toDoState의 default값 중 key를 가져와서 반복으로 돌림.  */}
          {Object.keys(toDos).map((boardId) => (
            <SecondBoard
              key={boardId}
              boardId={boardId}
              toDos={toDos[boardId]}
            />
          ))}
        </Boards>
        <AddBoardButton onClick={addBtnClicked} />
      </Wrapper>
    </DragDropContext>
  );
}

export default SecondApp;

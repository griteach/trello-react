import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import SecondDraggalbeCard from "./SecondDraggableCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};

  padding: 20px;
  border-radius: 15px;
  min-height: 100px;
`;

const Title = styled.h1`
  text-align: center;
  color: black;
  padding: 5px;
`;

interface ISecondBoardProps {
  toDos: string[];
  boardId: string;
}

function SecondBoard({ toDos, boardId }: ISecondBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <SecondDraggalbeCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default SecondBoard;

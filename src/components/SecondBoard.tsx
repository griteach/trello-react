import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { secondToDoState } from "../secondAtoms";
import SecondDraggalbeCard from "./SecondDraggableCard";

const Wrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};

  padding: 10px;
  border-radius: 15px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.span`
  text-align: center;
  color: black;
  padding: 5px;
`;

interface IAreaProps {
  draggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const DeleteBtn = styled.span`
  color: red;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  right: 5px;
  &:hover {
    color: black;
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.5s ease-in-out;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    box-sizing: border-box;
    width: 70%;
    border: none;
    border-radius: 5px;
    padding: 4px;
    background-color: #00cec9;

    ::placeholder {
      color: white;
      text-align: center;
    }
    &:hover {
    }
    &:focus {
      outline-color: #ffeaa7;
    }
  }
`;

interface ISecondBoardProps {
  toDos: string[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

function SecondBoard({ toDos, boardId }: ISecondBoardProps) {
  const setToDos = useSetRecoilState(secondToDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const deleteBtnClicked = () => {
    const answer = window.confirm("이 보드를 삭제하시겠습니까?");
    if (answer) {
      setToDos((oldToDos) => {
        const newToDos = {
          ...oldToDos,
        };

        console.log(boardId, "를 지우려고 합니다.");
        console.log(newToDos, "삭제 되기 전 버전");

        //삭제할 때 delete obj[key]

        if (delete newToDos[boardId]) {
          console.log(newToDos, "삭제된 버전");
          console.log("삭제 됐어야함!!!");
          window.localStorage.setItem("toDo", JSON.stringify(newToDos));
          return newToDos;
        } else {
          console.log("노 안됨 삭제 안됨");
          return oldToDos;
        }
      });
    }
  };
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      //값을 돌려주는데, toDoState는 객체이기 때문에 객체를 돌려주면서
      //현재의 boardId 키를 갖고 있는 값에 새로운 배열을 만들어 넣어준다.
      //이 때도, 기존의 boardId키에서 갖고 있던 기존 밸류를 넣어주고, 새롭게 입력받은 값을 추가해준다.
      //여기서는 입력받은 값이 앞에 들어가도록 세팅했다.
      const newToDos = {
        ...oldToDos,
        [boardId]: [toDo, ...oldToDos[boardId]],
      };

      window.localStorage.setItem("toDo", JSON.stringify(newToDos));
      return newToDos;
    });

    //input toDo 폼의 값을 빈 칸으로 해주기.
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{boardId}</Title>
        <DeleteBtn onClick={deleteBtnClicked}>X</DeleteBtn>
      </TitleWrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: true,
          })}
          type="text"
          placeholder={`Write it on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <SecondDraggalbeCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default SecondBoard;

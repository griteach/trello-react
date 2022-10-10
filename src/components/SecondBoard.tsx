import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { secondToDoState } from "../secondAtoms";
import SecondDraggalbeCard from "./SecondDraggableCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};

  padding: 20px;
  border-radius: 15px;
  min-height: 100px;
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
    const myAnswer = window.confirm("이 보드를 정말 삭제하시겠습니까?");
    if (myAnswer) {
      console.log("이 보드를 삭제한다고 클릭했을 때");
      setToDos((oldToDos) => {
        const newToDos = {
          ...oldToDos,
        };

        console.log(boardId, "를 지우려고 합니다.");
        console.log(newToDos, "삭제 되기 전 버전");
        console.log(delete newToDos.boardId);
        delete newToDos.boardId;
        console.log(newToDos, "삭제된 버전");

        return newToDos;
      });
    }
  };
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      //값을 돌려주는데, toDoState는 객체이기 때문에 객체를 돌려주면서
      return {
        //기존의 값을 다 넣어주고,
        ...oldToDos,

        //현재의 boardId 키를 갖고 있는 값에 새로운 배열을 만들어 넣어준다.
        //이 때도, 기존의 boardId키에서 갖고 있던 기존 밸류를 넣어주고, 새롭게 입력받은 값을 추가해준다.
        //여기서는 입력받은 값이 앞에 들어가도록 세팅했다.
        [boardId]: [toDo, ...oldToDos[boardId]],
      };
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

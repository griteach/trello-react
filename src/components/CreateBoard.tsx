import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import { boardIdState, toDoState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';



const Wrapper = styled.div`
padding:10px;
width:200px;
background-color: ${(props) => props.theme.cardColor};
border-radius: 5px;

display: flex;
justify-content: center;
align-items: center;
box-sizing: border-box;

`;


const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button{
        margin-left:10px;
    }
    input{
        
        padding:5px 0px;
        border: none;
        border-radius: 5px;
        
        background-color: #00cec9;
        
        ::placeholder{
            color:white;
            text-align: center;
        }
        &:hover{
            
        }
        &:focus{
            
            outline-color: #ffeaa7;
        }
    }
`;


interface IForm{
    boardId:string;
}




function CreateBoard(){

    const setBoardId = useSetRecoilState(boardIdState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({boardId}:IForm) => {

        
        setBoardId((prev) => {
            
            const myNewBoardId = [
                ...prev,
                boardId,
            ];
            console.log(myNewBoardId);
            return myNewBoardId;
            

            
    });
        setValue("boardId", "");
    }
    return (
        <Wrapper>
            
            <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("boardId", {
                required:true,
            })} type="text" placeholder="Add a board here" />
            <button type="submit">+</button>
            </Form>
            
        </Wrapper>
    )
}

export default CreateBoard;
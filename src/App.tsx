
import { create } from 'domain';
import { DragDropContext, Draggable, Droppable }from "react-beautiful-dnd";
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
`



function App() {
  const onDragEnd = () => {};
return <DragDropContext onDragEnd={onDragEnd}>
  <div>
    <Droppable droppableId="one">
      {() => <ul>
        
        <Draggable draggableId="first" index={0}>
          {() => <li>One</li>}
        </Draggable>
        <Draggable draggableId="second" index={1}>
          {() => <li>Two</li>}
        </Draggable>
        </ul>}
    </Droppable>
  </div>

</DragDropContext>;
  
}

export default App;

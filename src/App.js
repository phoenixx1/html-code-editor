import styled from "styled-components";
import Editor from "./Editor";

function App() {
  return (
    <AppContainer>
      <Editor />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

import styled from "styled-components";

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  h2 {
    margin: 10px;
  }
  .slider {
    padding: 10px;
    @media screen and (max-width: 500px) {
      visibility: hidden;
    }
  }

  &.dark {
    background: grey;
    color: white;
  }
`;

export const Controls = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  Button {
    color: white;
    background-color: #1e3a82;
    padding: 5px 10px;
    font-size: 0.8rem;

    :hover {
      background-color: black;
      transform: scale(1.02);
    }
  }

  .fontSizeSelect {
    width: 80px;
  }
  .themeSelect {
    width: 80px;
  }
  .control-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45%;

    .control-r-right {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 60%;
      @media screen and (max-width: 750px) {
        /* flex-direction: column; */
        width: 80%;
      }
      @media screen and (max-width: 550px) {
        .themeSelect,
        .fontSizeSelect {
          visibility: hidden;
        }
      }
    }
  }
`;

export const CodingSection = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    .editor,
    .frame {
      width: 100% !important;
      height: 40vh !important;
    }
  }
`;

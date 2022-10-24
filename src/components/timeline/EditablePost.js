import styled from "styled-components";

export default function Edit(postId, text) {
  return (
    <InputNewText type="text" placeholder="text" name="newText"></InputNewText>
  );
}

const InputNewText = styled.input`
  width: 503px;
  height: 30px;
  background: #ffffff;
  border-radius: 5px;
  border: 0;
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #949494;
  margin-bottom: 5px;
  text-align: initial;
`;

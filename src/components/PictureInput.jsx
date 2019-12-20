import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  img {
    width: 200px;
    margin-right: 12px;
    padding: 5px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
  }

  label {
    display: inline-block;
    height: 32px;
    padding: 0 15px;
    line-height: 32px;
    color: #fff;
    background: #1890ff;
    border-radius: 2px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      background: #40a9ff;
    }

    input {
      display: none;
    }
  }
`;

function PictureInput(props) {
  const { value, onChange } = props;
  const [fileSrc, setFileSrc] = useState(value);

  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    onChange(file);
    const src = URL.createObjectURL(file);
    setFileSrc(src);
  }

  return (
    <Container>
      {!!fileSrc && <img alt="" src={fileSrc} />}
      <label>
        点击上传
        <input
          type="file"
          onChange={handleChange}
          accept="image/*"
        />
      </label>
    </Container>
  );
}

PictureInput.defaultProps = {
  onChange: () => {},
};

export default PictureInput;

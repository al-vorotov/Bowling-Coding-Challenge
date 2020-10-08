import React from 'react';

import {Button, Icon} from "react-materialize";

import {ICustomButton} from '../types'

const CustomButton: ({onClick, children, icon}: ICustomButton) => JSX.Element = ({onClick, children, icon}: ICustomButton) => {

  return (
    <>
      <div>
        <Button
          node="a"
          small
          style={{
            marginRight: '5px'
          }}
          waves="light"
          onClick={onClick}
        >
          {children}
          {
            icon && <Icon left>{icon}</Icon>
          }
        </Button>
      </div>
    </>
  );
}

export default CustomButton;

import React from 'react';

import {Button} from "react-materialize";

import {ICustomButton} from '../types'

const CustomButton: ({onClick, children}: ICustomButton) => JSX.Element = ({onClick, children}: ICustomButton) => {

  return (
    <>
      <div>
        <Button
          node="a"
          small
          waves="light"
          onClick={onClick}
        >

          {children}
        </Button>
      </div>
    </>
  );
}

export {CustomButton};

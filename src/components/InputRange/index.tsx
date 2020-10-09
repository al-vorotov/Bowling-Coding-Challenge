import React from 'react';

import {IInputRange} from "../types";

const InputRange: ({onChange, value, max}: IInputRange) => JSX.Element = ({onChange, value, max}:IInputRange) =>  {
  return (
    <>
      <input
        type="range"
        onChange={onChange}
        id="test5"
        min="0"
        max={max}
        value={value}
      />
    </>
  );
}

export{InputRange};

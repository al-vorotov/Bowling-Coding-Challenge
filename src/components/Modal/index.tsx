import React, {FC} from 'react';

import {Modal} from "react-materialize";

import {IModalProps} from "../types";

const CustomModal: FC<IModalProps> = ({header, open, children, handleCloseModal}: IModalProps) => {

  return (
    <>
      <Modal
        bottomSheet={false}
        fixedFooter={false}
        header={header}
        id="modal1"
        open={open}
        options={{
          dismissible: true,
          preventScrolling: true,
          onCloseEnd: handleCloseModal
        }}
      >
        {children}
      </Modal>
    </>
  );
}

export{ CustomModal};

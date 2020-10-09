import React, {FC} from 'react';

import {IPinsDisplay} from "../types";

import styles from './styles.module.scss'

import pinsDisplay from '../../assets/image/pinsDisplay.png'

const PinsDisplay: FC<IPinsDisplay> = ({pins}: IPinsDisplay) => {

  return (
    <>
      <div className={styles.pinsDisplay}>
        <div className={styles.pinsDisplay__imageWrapper}>
          <img src={pinsDisplay} alt='pins display slot bg' loading="lazy"/>
        </div>
        <div className={styles.pinsDisplay__pinsWrapper}>
          <p className="red-text text-accent-2">
            {pins}
          </p>
        </div>
      </div>
    </>
  );
}

export {PinsDisplay};

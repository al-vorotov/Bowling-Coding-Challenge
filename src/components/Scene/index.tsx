import React, {FC} from 'react';

import {IScene} from "../types";

import styles from './styles.module.scss'

import currentPinsDisplay from '../../assets/image/currentPinsDisplay.png'

const Scene: FC<IScene> = ({currentlyPins}: IScene) => {

  return (
    <>
      <div className={styles.scene}>
        <div className={styles.currentPinsDisplay}>
          <div className={styles.currentPinsDisplay__imageWrapper}>
            <img src={currentPinsDisplay} alt='current pins display slot bg' loading="lazy"/>
          </div>
          <div className={styles.currentPinsDisplay__pinsWrapper}>
            <p className="red-text text-accent-2">
              {currentlyPins}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export {Scene};

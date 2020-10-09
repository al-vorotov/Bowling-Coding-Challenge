import React, {FC} from 'react';

import styles from './styles.module.scss'

import pinsLogo from '../../assets/image/pins_logo.png'

const Header: FC = () => {
  return (
    <>
      <nav>
        <div>
          <div className={styles.imageWrapper}>
          <img src={pinsLogo} alt="bowling game logo" loading="eager"/>
          </div>
        </div>
      </nav>
    </>
  );
}

export{ Header};

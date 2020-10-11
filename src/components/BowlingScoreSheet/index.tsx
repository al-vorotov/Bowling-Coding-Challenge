import React, {FC} from 'react';

import {Row, Col} from "react-materialize";

import {IBowlingScoreSheet} from "../types";
import {IFrame} from "../../layouts/BowlingPlayground/types";

import styles from './styles.module.scss'

const BowlingScoreSheet: FC<IBowlingScoreSheet> = ({frameScheme}: IBowlingScoreSheet) => {
  const handleActionDisplay = (item: IFrame) => {

    return item.strike //if strike
      ? 'x'
      : `${String(
        item.goals1 < 0 //if null
          ? ' '
          : item.goals1
      )}
                |
                ${String(
        item.goals2 < 0 //if null
          ? ' '
          : item.goals2 + item.goals1 === 10 // if spare
          ? '/'
          : item.goals2
      )}`
  }
  return (
    <>
      <Row className={styles.bowlingScoreSheet}>
        {frameScheme.map((item) => <Col
          className="teal white-text"
          s={1}
          key={item.stage}
        >
          {String(item.stage > 9 ? 'bonus': item.stage + 1 )}
        </Col>)}
      </Row>
      <Row className={styles.bowlingScoreSheet__row}>
        {frameScheme.map((item: IFrame) => <Col
          className="teal white-text"
          s={1}
          key={item.stage}
        >
          <span>
            {handleActionDisplay(item)}
          </span>
        </Col>)}
      </Row>
      <Row className={styles.bowlingScoreSheet__row}>
        {frameScheme.map((item) => <Col
          className="teal white-text"
          s={1}
          key={item.stage}
        >
          <span> {String(item.total)}</span>
        </Col>)}
      </Row>
    </>
  );
}

export {BowlingScoreSheet};

import React, {FC} from 'react';

import {Row, Col} from "react-materialize";

import {IBowlingScoreSheet} from "../types";

const BowlingScoreSheet: FC<IBowlingScoreSheet> = ({frameScheme}: IBowlingScoreSheet) => {

  return (
    <>
      <Row style={{margin: '50px auto 0'}}>
        {frameScheme.map((item) => <Col
          className="teal white-text"
          s={1}
          key={item.stage}
        >
          {String(item.stage + 1)}
        </Col>)}
      </Row>
      <Row style={{margin: '0 auto'}}>
        {frameScheme.map((item) => <Col
          className="teal white-text"
          s={1}
          key={item.stage}
        >
          <span>
            {
              item.strike
                ? 'x'
                : `${String(item.goals1 === 0
                ? ' '
                : item.goals1)}
                |
                ${String(item.goals2 === 0
                ? ' '
                : item.goals2)}`
            }
          </span>
        </Col>)}
      </Row>
      <Row style={{margin: '0 auto'}}>
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

export default BowlingScoreSheet;

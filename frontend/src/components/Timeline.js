import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  margin: 20px 0;
`;

const TimelineItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Timeline = ({ timeline }) => (
  <TimelineContainer>
    <h2>Training Timeline</h2>
    {timeline.map((item, index) => (
      <TimelineItem key={index}>
        <h3>{item.week}</h3>
        <p>{item.task}</p>
      </TimelineItem>
    ))}
  </TimelineContainer>
);

export default Timeline;

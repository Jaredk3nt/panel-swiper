import React from 'react';
import styled from '@emotion/styled';

/* Tab Components for use with Slider */
function SwiperTabContainer({ children, index, length, goToIndex }) {
  return (
    <TabContainer length={length}>
      {React.Children.map(children, (child, i) => ({
        ...child,
        props: {
          ...child.props,
          active: i === index,
          onClick: () => goToIndex(i)
        }
      }))}
    </TabContainer>
  );
}
const TabContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  z-index: 2;
`;

const SwiperTab = styled('button')`
  color: #000;
  flex: 1;
  border: none;
  height: ${p => p.height || '40px'};

  &:hover {
    cursor: pointer;
  }

  transition: background-color 0.25s ease;

  ${p => {
    if (p.active) {
      return `
        background-color: #000;
        color: #fff;
      `;
    }
  }}
`;

export { SwiperTabContainer, SwiperTab };

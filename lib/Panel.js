import styled from '@emotion/styled';

/* Panel Wrapper for content in Slider */
const SliderPanel = styled('div')`
  width: calc(100% / ${p => p.length});
  height: 100%;
  display: inline-block;
`;

export default SliderPanel;

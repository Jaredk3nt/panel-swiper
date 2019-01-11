import React, { Component } from 'react';
import { Spring } from 'react-spring';
import styled from '@emotion/styled';
import Hammer from 'react-hammerjs';
// Components
import Panel from './Panel';
import { SwiperTabContainer } from './SwiperTabs';

function isPanel(el) {
  return el.type === Panel;
}

function isTabs(el) {
  return el.type === SwiperTabContainer;
}

/* Slider component */
class Swiper extends Component {
  state = {
    width: 0,
    length: 0,
    index: 0,
    swipeDelta: 0,
    prevSwipeDelta: 0
  };

  componentDidMount() {
    this.setState({
      length: this.props.children.filter(isPanel).length,
      width: window.innerWidth
    });
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.setState({
        length: this.props.children.filter(isPanel).length
      });
    }
  }

  goToIndex = index => this.setState({ index });

  handleSwipe = e => {
    const delta = e.deltaX;
    const { index, length } = this.state;
    if ((delta > 0 && index > 0) || (delta < 0 && index < length - 1)) {
      this.setState(() => ({
        swipeDelta: e.deltaX,
        prevSwipeDelta: e.deltaX
      }));
    }
  };

  handleSwipeEnd = () => {
    const { width, swipeDelta, index, length } = this.state;
    if (swipeDelta < -(width / 2) && index < length - 1) {
      this.setState(ps => ({ index: ps.index + 1 }));
    } else if (swipeDelta > width / 2 && index > 0) {
      this.setState(ps => ({ index: ps.index - 1 }));
    }
    this.setState(() => ({ swipeDelta: 0 }));
  };

  handleResize = () => {
    this.setState(() => ({ width: window.innerWidth }));
  };

  calculateDelta = swipeDelta => {
    const { width, index } = this.state;
    return -index * width + swipeDelta;
  };

  render() {
    const { children } = this.props;
    const { length, swipeDelta, prevSwipeDelta, index } = this.state;
    return (
      <OuterContainer>
        {React.Children.map(children, child => {
          if (isTabs(child))
            return {
              ...child,
              props: {
                ...child.props,
                length,
                index,
                goToIndex: this.goToIndex
              }
            };
        })}
        <Spring
          from={{ delta: this.calculateDelta(prevSwipeDelta) }}
          to={{ delta: this.calculateDelta(swipeDelta) }}
        >
          {props => (
            <Hammer onPan={this.handleSwipe} onPanEnd={this.handleSwipeEnd}>
              <SliderContainer length={length} delta={props.delta}>
                {React.Children.map(children, child => {
                  if (isPanel(child))
                    return {
                      ...child,
                      props: {
                        ...child.props,
                        length,
                        index
                      }
                    };
                })}
              </SliderContainer>
            </Hammer>
          )}
        </Spring>
      </OuterContainer>
    );
  }
}
const SliderContainer = styled('div')`
  width: calc(100% * ${p => p.length});
  height: 100%;
  position: relative;
  left: ${p => p.delta}px;
`;
const OuterContainer = styled('div')`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

export default Swiper;

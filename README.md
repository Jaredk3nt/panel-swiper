# Panel Swiper

A native styled panel swiper for React, animated with [react-spring](https://react-spring.github.io/).

## Installation

```
npm install --save panel-swiper
```

## Example

```jsx
import React from 'react';
import { Swiper, Panel } from 'panel-swiper';

function SwipeView() {
  return (
    <Swiper>
      <Panel>Panel 1</Panel>
      <Panel>Panel 2</Panel>
      <Panel>Panel 3</Panel>
    </Swiper>
  );
}
```

With tabs:

```jsx
import React from 'react';
import { Swiper, Panel, SwiperTabContainer, SwiperTab } from 'panel-swiper';

function SwipeView() {
  return (
    <Swiper>
      <SwiperTabContainer>
        <SwiperTab>Panel 1</SwiperTab>
        <SwiperTab>Panel 2</SwiperTab>
        <SwiperTab>Panel 3</SwiperTab>
      </SwiperTabContainer>
      <Panel>Panel 1</Panel>
      <Panel>Panel 2</Panel>
      <Panel>Panel 3</Panel>
    </Swiper>
  );
}
```
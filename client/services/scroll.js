'use strict';

// Services
import { arrayLoop } from 'services/array';
import { toFixedNumber } from 'services/numbers';

let windowY = 0;
let scrollY = 0;
let ticking = false;

const elements = {};

export const destroyScroll = (id) => {
  elements[id] = null;
};

const doScroll = () => {
  arrayLoop(elements, (id, item) => {
    if (item === null) return;

    const hasMove = typeof(item.move) === `function`;
    const hasEnter = typeof(item.enter) === `function`;
    const hasLeave = typeof(item.leave) === `function`;

    if (!hasMove && !hasEnter && !hasLeave) return;

    const args = {
      scrollY,
    };

    if (item.el) {
      const rect = item.el.getBoundingClientRect() || {};

      args.top = {
        top: rect.top,
        topPercent: toFixedNumber((rect.top / windowY) * -100, 2),
        bottom: rect.top - windowY,
      };

      args.bottom = {
        bottom: rect.bottom,
      };

      if (hasEnter) {
        args.enter = args.top.top <= windowY / 2;
      }
    }

    if (hasMove) {
      item.move(args);
    }

    if (hasEnter && args.enter) {
      item.enter(args);
      destroyScroll(id);
    }

    if (item.debug) {
      console.log(id, args); // eslint-disable-line no-console
    }

    // if (hasEnter) {
    //   if (item.el) {
    //     if (topTop > windowY / 2) {
    //       console.log('ABOVE');
    //     } else {
    //       console.log('BELOW');
    //     }
    //   }
    //   if (topTop / 2) {
    //     console.log('ENTER!');
    //   }
    //   console.log('ENTER', id, item);
    // }

  });
};

const initScroll = () => {
  scrollY = window.scrollY;
  windowY = window.innerHeight;

  if (ticking) return false;

  window.requestAnimationFrame(() => {
    doScroll();
    ticking = false;
  });


  ticking = true;
};

export const createScroll = (id, args) => {
  if (typeof(id) !== `string`) {
    console.error(`id must be a string`);
    return false;
  }

  elements[id] = args;
  doScroll();
};


window.removeEventListener(`scroll`, initScroll, false);
window.addEventListener(`scroll`, initScroll, false);
window.addEventListener(`load`, initScroll(), false);

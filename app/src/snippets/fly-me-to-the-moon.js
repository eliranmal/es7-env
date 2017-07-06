
const earth = String.fromCodePoint(0x1f30e);
const moon = String.fromCodePoint(0x1f312);
const rocket = String.fromCodePoint(0x1f680);

const interval = 150;

let steps = 20;
let journey = Array(steps).fill(' ');

const tick = () => {
  if (steps) {
    steps--;

    setTimeout(() => {

      journey.unshift(journey.includes(rocket) ? ' ' : rocket);
      journey.pop();

      console.clear();
      console.dir();
      console.dir(`${earth}${journey.join('')}${moon}`);

      tick();
    }, interval);
  }
};

tick();

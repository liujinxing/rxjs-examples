/* eslint-disable no-console */
import { interval } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

const source = interval(50);

const connectable = source.pipe(
  take(3),
  shareReplay(1),
);

connectable.subscribe((value) => {
  console.log(`观察者A: ${value}`);
});

connectable.subscribe((value) => {
  console.log(`观察者B: ${value}`);
});

setTimeout(() => {
  connectable.subscribe((value) => {
    console.log(`观察者C: ${value}`);
  });
}, 100);

setTimeout(() => {
  connectable.subscribe((value) => {
    console.log(`观察者D: ${value}`);
  });
}, 160);

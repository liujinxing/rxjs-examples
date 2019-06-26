/* eslint-disable no-console */
import { interval } from 'rxjs';
import { tap, refCount, take, publishBehavior } from 'rxjs/operators';

const source = interval(50);

const published = source.pipe(
  tap((value) => console.log(`副作用：${value}`)),
  take(5),
  publishBehavior(-1),
  refCount(),
);

published.subscribe((value) => {
  console.log(`观察者A: ${value}`);
});

published.subscribe((value) => {
  console.log(`观察者B: ${value}`);
});

setTimeout(() => {
  published.subscribe((value) => {
    console.log(`观察者C: ${value}`);
  });
}, 200);

setTimeout(() => {
  published.subscribe((value) => {
    console.log(`观察者D: ${value}`);
  });
}, 1000);

/* eslint-disable no-console */
import { interval } from 'rxjs';
import { tap, refCount, take, publishLast } from 'rxjs/operators';

const source = interval(50);

const connectable = source.pipe(
  tap((value) => console.log(`副作用：${value}`)),
  take(5),
  publishLast(),
  refCount(),
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
}, 200);

setTimeout(() => {
  connectable.subscribe((value) => {
    console.log(`观察者D: ${value}`);
  });
}, 700);

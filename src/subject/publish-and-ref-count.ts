/* eslint-disable no-console */

/**
 * `publish()`会将源可观察对象生成为可多播的可观察对象（也就是ConnectableObservable），然后使用`refCount()`自动执行`connect()`。
 */

import { tap, publish, refCount, take } from 'rxjs/operators';
import { interval } from 'rxjs';

const source = interval(100);

const published = source.pipe(
  tap((value) => console.log(`副作用：${value}`)),
  take(5),
  publish(),
  refCount(),
);

published.subscribe((value) => {
  console.log(`观察者A: ${value}`);
});

published.subscribe((value) => {
  console.log(`观察者B：${value}`);
});

setTimeout(() => {
  published.subscribe((value) => {
    console.log(`观察者C: ${value}`);
  });
}, 300);

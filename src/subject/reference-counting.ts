/* eslint-disable no-console */

/**
 * `refCount()`: 首次有观察者订阅时自动执行`connect()`，并且在最后一个观察者取消订阅时取消共享的可观察对象的订阅执行上下文。
 */

import { interval, Subject, Subscription } from 'rxjs';
import { tap, multicast, refCount } from 'rxjs/operators';

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(
  // 副作用只会执行一遍，因为可观察对象已经被多播了
  tap((value) => {
    console.log(`副作用：${value}`);
  }),
  multicast(subject),
  refCount(),
);
let subscription2: Subscription;

console.log('观察者A订阅');
const subscription1 = refCounted.subscribe((value) => {
  console.log(`观察者A：${value}`);
});

setTimeout(() => {
  console.log('观察者B订阅');
  subscription2 = refCounted.subscribe((value) => {
    console.log(`观察者B：${value}`);
  });
}, 600);

setTimeout(() => {
  console.log('观察者A取消订阅');
  subscription1.unsubscribe();
}, 1200);

setTimeout(() => {
  console.log('观察者B取消订阅');
  subscription2.unsubscribe();
}, 2000);

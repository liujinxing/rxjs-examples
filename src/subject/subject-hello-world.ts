/* eslint-disable no-console */
/*
 * 演示Subject的多播特性：可以同时有多个观察者。
 *
 * allows values to be multicasted to many Observers.
 */

import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe((value) => {
  console.log(`观察者A：${value}`);
});

subject.subscribe((value) => {
  console.log(`观察者B：${value}`);
});

subject.next(1);
subject.next(2);

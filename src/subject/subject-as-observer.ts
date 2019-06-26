/* eslint-disable no-console */
/*
 * 主题是观察者。本示例演示了主题可以作为观察者，所以可以作为可观察对象的`subscribe()`方法的参数。
 */
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe((value) => {
  console.log(`观察者A：${value}`);
});

subject.subscribe((value) => {
  console.log(`观察者B：${value}`);
});

const observable = from([1, 2, 3]);

observable.subscribe(subject);

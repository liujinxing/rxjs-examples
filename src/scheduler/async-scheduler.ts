/* eslint-disable no-console */
import { from, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const source = from([1, 2, 3]);

console.log('订阅之前');

source.pipe(observeOn(asyncScheduler)).subscribe((value) => {
  console.log(`观察者：${value}`);
});

console.log('订阅之后');

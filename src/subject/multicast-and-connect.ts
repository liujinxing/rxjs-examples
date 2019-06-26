/* eslint-disable no-console */

/**
 * `multicast`操作：Observers subscribe to an underlying Subject, and the Subject subscribes to the source Observable.
 *
 * `multicast`操作使用提供的主题来共享源可观察对象。
 */

import { from, Subject, ConnectableObservable } from 'rxjs';
import { multicast, tap } from 'rxjs/operators';

const source = from([1, 2, 3]);
const subject = new Subject<number>();
const multicasted = source.pipe(
  // 因为我们在下面进行了多播，所以副作用只会调用一次
  tap((value) => console.log(`副作用：${value}`)),
  multicast(subject),
) as ConnectableObservable<number>;

multicasted.subscribe((value) => {
  console.log(`观察者A：${value}`);
});

multicasted.subscribe((value) => {
  console.log(`观察者B：${value}`);
});

// 使用主题订阅源可观察对象
// 使用subject订阅source，相当于：source.subscribe(subject)
multicasted.connect();

/* eslint-disable no-console */
/**
 * `BehaviorSubject`
 *
 * 当观察者订阅BehaviorSubject时，它开始发射原始Observable**最近**发射的数据（如果此时还没有收到任何数据，它会发射一个默认值），然后继续发射其它任何来自原始Observable的数据。
 *
 * 然而，如果原始的Observable因为发生了一个错误而终止，BehaviorSubject将不会发射任何数据，只是简单的向前传递这个错误通知。
 */

import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(0);

subject.subscribe((value) => {
  console.log(`观察者A:${value}`);
});

subject.next(1);
subject.next(2);

subject.subscribe((value) => {
  console.log(`观察者B：${value}`);
});

subject.next(3);

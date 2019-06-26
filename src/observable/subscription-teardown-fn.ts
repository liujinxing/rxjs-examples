/* eslint-disable no-console */
/**
 * 在创建可观察对象时，订阅者可以返回一个清除函数（teardown function），它会在可观察对象`complete()`、`error()`或者`subscription.unsubscribe()`时调用。
 *
 * 有一点非常重要，对于一次订阅来说，只会调用一次teardown函数。比如说，你在订阅发出`complete`通知后，再调用`subscription.unsubscribe()`，teardown函数只会执行一次。
 *
 * **一次订阅只能取消一次，只能执行一次清除函数**。
 */

import { Observable, Observer } from 'rxjs';

const subscriber = (observer: Observer<number>) => {
  observer.next(1);
  observer.next(2);

  const timeoutId = setTimeout(() => {
    observer.next(3);
    observer.complete();
  }, 100);

  return () => {
    console.log('清空可观察对象');
    clearTimeout(timeoutId);
  };
};

const observable = new Observable<number>(subscriber);

const subscription = observable.subscribe((value) => {
  console.log(`观察者A：${value}`);
});

console.log('第一次调用subscription.unsubscribe()，会执行teardown');
subscription.unsubscribe();
console.log('第二次调用subscription.unsubscribe()，但是不会再次执行teardown');
subscription.unsubscribe();

const subscriptionB = observable.subscribe(
  (value) => {
    console.log(`观察者B: ${value}`);
  },
  undefined,
  () => {
    console.log('已完成，即将调用teardown函数');
  },
);

setTimeout(() => {
  console.log(
    '订阅结束后再调用subscription.unsubscribe()，不会再次执行teardown',
  );
  subscriptionB.unsubscribe();
}, 1000);

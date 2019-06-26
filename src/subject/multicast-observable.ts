/* eslint-disable no-console */
/*
 * 来自[Angular](https://angular.cn/guide/observables#multicasting)的例子，用来演示如何创建多播的可观察对象。
 *
 * 当然，我们有更简单的方法来创建多播可观察对象。
 */
import { Observable, Observer } from 'rxjs';

// Run through an array of numbers, emitting one value
// per second until it gets to the end of the array.
function doSequence(
  observer: Observer<number>,
  arr: number[],
  idx: number,
): number {
  return (setTimeout(() => {
    observer.next(arr[idx]);
    if (idx === arr.length - 1) {
      observer.complete();
    } else {
      doSequence(observer, arr, idx + 1);
    }
  }, 1000) as any) as number;
}

function multicastSequenceSubscriber() {
  const seq = [1, 2, 3];
  // Keep track of each observer (one for every active subscription)
  const observers: Observer<number>[] = [];
  // Still a single timeoutId because there will only ever be one
  // set of values being generated, multicasted to each subscriber
  let timeoutId: number;

  // Return the subscriber function (runs when subscribe()
  // function is invoked)
  return (observer: Observer<number>) => {
    observers.push(observer);
    // When this is the first subscription, start the sequence
    if (observers.length === 1) {
      const multicastObserver: Observer<number> = {
        next: (val) => {
          // Iterate through observers and notify all subscriptions
          observers.forEach((obs) => obs.next(val));
        },
        complete: () => {
          // Notify all complete callbacks
          observers.slice(0).forEach((obs) => obs.complete());
        },
        error: (error) => {
          observers.forEach((obs) => obs.error(error));
        },
      };

      timeoutId = doSequence(multicastObserver, seq, 0);
    }

    return {
      unsubscribe() {
        // Remove from the observers array so it's no longer notified
        observers.splice(observers.indexOf(observer), 1);
        // If there's no more listeners, do cleanup
        if (observers.length === 0) {
          clearTimeout(timeoutId);
        }
      },
    };
  };
}

// Create a new Observable that will deliver the above sequence
const multicastSequence = new Observable(multicastSequenceSubscriber());

// Subscribe starts the clock, and begins to emit after 1 second
multicastSequence.subscribe({
  next(num) {
    console.log(`1st subscribe: ${num}`);
  },
  complete() {
    console.log('1st sequence finished.');
  },
});

// After 1 1/2 seconds, subscribe again (should "miss" the first value).
setTimeout(() => {
  multicastSequence.subscribe({
    next(num) {
      console.log(`2nd subscribe: ${num}`);
    },
    complete() {
      console.log('2nd sequence finished.');
    },
  });
}, 1500);

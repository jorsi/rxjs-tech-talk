import { of, from, throwError, timer, BehaviorSubject } from 'rxjs'; 
import { map, filter, catchError, tap, switchMap, pluck, distinctUntilChanged, debounceTime } from 'rxjs/operators';

// DON'T TOUCH!
const hello$ = of('Hello');
const count$ = from([1,2,3,4]);
const subscribe$ = new BehaviorSubject('testing');
const catchError$ = of('Catch me!').pipe(switchMap(data => throwError(Error('Error not caught!'))));
const pluck$ = of({ name: 'Eleanor Rigby' });
const distinct$ = from([1, 1, 2, 2, 3, 3]);
// END DON'T TOUCH!


// change your code here!!
const helloWorld$ = hello$.pipe(
  map(data => data + ' World!')
);
const myCount$ = count$.pipe(
  filter(data => data % 2 === 0)
);
const mySubscription$ = subscribe$.subscribe();
const myCatchError$ = catchError$.pipe(
  catchError(data => 'yup')
);
const myPluck$ = pluck$.pipe(
  pluck('name')
);
const myDistinct$ = distinct$.pipe(
  distinctUntilChanged()
);


// DON'T TOUCH!
helloWorld$.subscribe(data => {
  if (data !== 'Hello World!') {
      console.error(`helloWorld$ - "${data}"" doesn't equal "Hello World!"`);
    } else {
      console.log(`helloWorld$ Success! - "${data}"" equals "Hello World!"`);
    }
});
myCount$.subscribe(data => {
  if (data % 2 !== 0) {
      console.error(`myCount$ - ${data} isn't even!`);
    } else {
      console.log(`myCount$ Success! - ${data} is even!`);
    }
});
if (subscribe$.observers.length === 0) {
  console.error(`subscribe$ Error! - You haven't subscribed to subscribe$!`);
} else {
  console.log(`subscribe$ Success! - You subscribed to subscribe$!`);
}
myCatchError$.subscribe(
  data => console.log('myCatchError$ - Success! Error caught'),
  error => console.error(`myCatchError$ - Error! ${error}`)
);
myPluck$.subscribe(data => {
  if (data !== 'Eleanor Rigby') {
      console.error(`myPluck$ - "${data}" doesn't equal "Eleanor Rigby"`);
    } else {
      console.log(`myPluck$ Success! - "${data}" equals "Eleanor Rigby"`);
    }
});
let last = 0;
myDistinct$.subscribe(data => {
  if (last === data) {
      console.error(`myDistinct$ - ${data} is the same as the last number ${last}`);
    }
  last = data;
});
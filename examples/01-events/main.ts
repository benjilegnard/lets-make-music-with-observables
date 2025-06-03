declare global {
  interface Observable<T> {
    pipe<R>(op1: (source: Observable<T>) => Observable<R>): Observable<R>;
    pipe<R1, R2>(
      op1: (source: Observable<T>) => Observable<R1>,
      op2: (source: Observable<R1>) => Observable<R2>,
    ): Observable<R2>;
    pipe<R1, R2, R3>(
      op1: (source: Observable<T>) => Observable<R1>,
      op2: (source: Observable<R1>) => Observable<R2>,
      op3: (source: Observable<R2>) => Observable<R3>,
    ): Observable<R3>;
  }
}

Observable.prototype.pipe = function (...operators: any[]) {
  return operators.reduce((source, operator) => operator(source), this);
};

function fromEvent(element: HTMLElement, eventType: string): Observable<Event> {
  return new Observable((observer) => {
    const handler = (event: Event) => observer.next(event);
    element.addEventListener(eventType, handler);

    return () => {
      element.removeEventListener(eventType, handler);
    };
  });
}

function merge<T>(...observables: Observable<T>[]): Observable<T> {
  return new Observable((observer) => {
    const subscriptions = observables.map((obs) =>
      obs.subscribe({
        next: (value) => observer.next(value),
        error: (err) => observer.error(err),
        complete: () => {
          if (subscriptions.every((sub) => sub.closed)) {
            observer.complete();
          }
        },
      }),
    );

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  });
}

function map<T, R>(
  fn: (value: T) => R,
): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>) => {
    return new Observable((observer) => {
      return source.subscribe({
        next: (value) => observer.next(fn(value)),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  };
}

function scan<T, R>(
  accumulator: (acc: R, value: T) => R,
  seed: R,
): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>) => {
    return new Observable((observer) => {
      let acc = seed;
      return source.subscribe({
        next: (value) => {
          acc = accumulator(acc, value);
          observer.next(acc);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  };
}

function startWith<T>(value: T): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => {
    return new Observable((observer) => {
      observer.next(value);
      return source.subscribe(observer);
    });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const incrementButton = document.getElementById(
    "increment",
  ) as HTMLButtonElement;
  const decrementButton = document.getElementById(
    "decrement",
  ) as HTMLButtonElement;
  const counterDisplay = document.getElementById("counter") as HTMLDivElement;

  const increment$ = fromEvent(incrementButton, "click").pipe(map(() => 1));
  const decrement$ = fromEvent(decrementButton, "click").pipe(map(() => -1));

  const counter$ = merge(increment$, decrement$).pipe(
    scan((acc, value: number) => acc + value, 0),
    startWith(0),
  );

  counter$.subscribe((count) => {
    counterDisplay.textContent = count.toString();
  });
});

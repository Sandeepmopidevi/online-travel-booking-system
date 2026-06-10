# RxJS Concepts in Angular - Beginner-Friendly with Stayora Examples

## What is RxJS?

RxJS is a library that helps you handle things that happen over time—like user clicks, HTTP calls, or form changes—in a simple and powerful way. In Angular, RxJS is used everywhere, from API calls to forms and even route changes.

---

## Core RxJS Concepts (with Simple Examples)

### 1. **Observable**

An Observable is like a stream of data—you can listen to it and get values over time.

**Example:**  
When a traveller books a hotel in Stayora, you might use an Observable to get booking updates.

```ts
import { Observable } from 'rxjs';

const bookingStatus$ = new Observable(observer => {
  observer.next('Booking Started');
  setTimeout(() => observer.next('Payment Done'), 1000);
  setTimeout(() => observer.complete(), 2000);
});
```

---

### 2. **Observer**

An Observer is just an object with functions that react when the Observable gives a value, an error, or is done.

```ts
const observer = {
  next: status => console.log('Status:', status),
  error: err => console.error('Error:', err),
  complete: () => console.log('Booking process complete!')
};

bookingStatus$.subscribe(observer);
```

---

### 3. **Subscription**

When you subscribe, you start listening to the Observable. You can also unsubscribe to stop listening (good for saving memory).

```ts
const subscription = bookingStatus$.subscribe(observer);
// When user leaves the page:
subscription.unsubscribe();
```

---

### 4. **Operators**

Operators let you change or react to data in the Observable.  
**Creation Operators:** `of`, `from`, `interval` (create streams)  
**Pipeable Operators:** `map`, `filter`, `switchMap` (modify streams)

**Example:**  
Show only hotel names in uppercase.

```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of('Stayora Grand', 'Sea View').pipe(
  map(name => name.toUpperCase())
).subscribe(console.log); // Output: STAYORA GRAND, SEA VIEW
```

---

### 5. **Subject**

A Subject is both an Observable and an Observer. It can send data to many subscribers at once.

**Example:**  
Notify multiple parts of Stayora when a new support ticket is created.

```ts
import { Subject } from 'rxjs';

const supportTicket$ = new Subject<string>();
supportTicket$.subscribe(ticket => console.log('Admin saw:', ticket));
supportTicket$.subscribe(ticket => console.log('Support team saw:', ticket));
supportTicket$.next('New support ticket raised');
```

---

### 6. **BehaviorSubject**

A BehaviorSubject always has a current value and gives it to new subscribers right away.

**Example:**  
Keep track of the current logged-in user.

```ts
import { BehaviorSubject } from 'rxjs';

const currentUser$ = new BehaviorSubject<string | null>(null);
currentUser$.next('Traveller1');
currentUser$.subscribe(user => console.log('Current user:', user)); // Output: Traveller1
```

---

### 7. **ReplaySubject**

A ReplaySubject keeps a certain number of previous values and gives them to new subscribers.

**Example:**  
Show the last 2 notifications to any new admin logging in.

```ts
import { ReplaySubject } from 'rxjs';

const notifications$ = new ReplaySubject<string>(2);
notifications$.next('Hotel added');
notifications$.next('Flight delayed');
notifications$.next('Review posted');
notifications$.subscribe(n => console.log('Admin sees:', n));
// Output: Flight delayed, Review posted
```

---

### 8. **AsyncSubject**

AsyncSubject only gives the *last* value when it finishes.

**Example:**  
Send the final invoice number to the user only after payment is completed.

```ts
import { AsyncSubject } from 'rxjs';

const invoice$ = new AsyncSubject<number>();
invoice$.subscribe(num => console.log('Invoice number:', num));
invoice$.next(101);
invoice$.next(102);
invoice$.complete(); // Output: 102
```

---

## Common RxJS Operators & Their Use in Stayora

| Operator       | What it does                           | Stayora Example                                  |
| -------------- | -------------------------------------- | ------------------------------------------------ |
| `map`          | Change values                          | Format hotel names to uppercase                  |
| `filter`       | Filter out unwanted values             | Only show hotels with rating ≥ 4                 |
| `tap`          | Side effects (like logging)            | Log every booking attempt                        |
| `switchMap`    | Cancel previous and switch to new call | Search hotels as you type in the search box      |
| `mergeMap`     | Run all inner Observables at once      | Send booking confirmations to many emails        |
| `concatMap`    | Run inner Observables one after another| Queue sending out review requests to users       |
| `debounceTime` | Wait for a pause before acting         | Wait for user to stop typing before searching    |
| `catchError`   | Handle errors                         | Show error if booking fails                      |

---

## RxJS in Angular: Real Stayora Examples

1. **API Calls:**  
   Get the list of hotels:
   ```ts
   this.http.get('api/hotels').subscribe(hotels => console.log(hotels));
   ```

2. **Reactive Forms:**  
   React to changes in the booking form:
   ```ts
   this.bookingForm.get('flight')?.valueChanges.subscribe(value => {
     console.log('Flight changed:', value);
   });
   ```

3. **Sharing State:**  
   Share current user info across components:
   ```ts
   currentUser$: Observable<User> = this.authService.currentUser$;
   ```

---

## Best Practices

- Always unsubscribe from Observables to avoid memory leaks (use `unsubscribe()` or `async` pipe).
- Use `BehaviorSubject` to share the latest value (like current user).
- Use `switchMap` for API calls in response to form input.
- Avoid subscribing inside another subscription.

---

## Interview Q&A (Simple)

**Q1: What is RxJS?**  
A: A library to handle streams of data/events over time in Angular.

**Q2: Difference between Observable and Promise?**  
A: Observables can give many values over time and can be cancelled; Promises give just one value.

**Q3: What is a Subject?**  
A: A way to send data to multiple parts of the app at once.

**Q4: When to use switchMap?**  
A: When you want only the result of the latest API call (like live search).

**Q5: What is BehaviorSubject used for?**  
A: To keep and share the latest value, like the current logged-in user.

**Q6: Why use debounceTime?**  
A: To wait until the user finishes typing before making an API call (saves resources).

**Q7: How to avoid memory leaks with RxJS in Angular?**  
A: Unsubscribe when done, or use the `async` pipe in templates.

---

**Summary:**  
RxJS helps you manage everything that happens over time (data, events, API calls) in Angular. In Stayora, it powers everything from booking hotels to live search and user authentication!

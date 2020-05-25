# Code Tooling

## Coding style

This project uses and encourages the use of a functional programming style (mostly inspired by [ShabadOS](https://github.com/ShabadOS/desktop)), which involves concepts such as immutable data structures and pure functions. Here are some guidelines to keep in mind: 

- Prefer being explicit over being implicit. 

Example: Instead of a traditional for loop, prefer to use functions such as `.map`, `.reduce`, and `.forEach`. This will provide the reader of your code a better understanding of what you will be doing since it explicitly states that you will be iterating over data in this specific way.

- Keep data immutable

Example: Instead of using a `for` loop to modify existing data, prefer to use functions such as `.map`, `.reduce`, and `.forEach` to modify data. These functions do not modify existing data; instead, they return a new array or object with the modified properties, so that the previous data is not modified. 

- Do not mutate parameters

Example: Instead of assigning function properties to new values, prefer to return a value from the function. Then, when calling the function, assign the return value to the variable you wish to update.

_The next tip is a more personal preference._

- Separate Functions

Example: Instead of declaring functions inside components, it is better to create these functions in a separate file, outside of a function, so that it is easier to test (when the tests are added) and keeps the code clean and concise. If the function depends heavily on props or state, however, then it is fine to declare a function inside the component ([example](https://github.com/KhalisIncubator/MyPothi/blob/dev/src/components/main/ShabadBlock.tsx#L24)).

## Eslint

Please adhere to all the declared Eslint rules where possible. If you wish, you can declare auto-formatting on save [here](/intro_docs/development.html#eslint).
## Typescript
This project is a Typescript-first application. This is to take advantage of type-safety, and prevent non-trivial bugs. It also forces thought into the data structures needed to solve a problem and prevents specifying too much data and repetitive data. 

Where possible, instead of assigning any to a variable, prefer to declare a new type. For components where there will be multiple props, prefer to declare an interface for the props (ie `interface ComponentProps`) and then use React.FC to strong type (`const Component: React.FC<ComponentProps>...`)

If possible, all files should be either suffixed with the `.ts` or `.tsx` extension. Should this cause problems, then it is justified to use a `.js` or `.jsx` file.



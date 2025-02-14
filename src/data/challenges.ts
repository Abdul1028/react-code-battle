import { Challenge } from '../types/challenge';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Create a Welcome Message',
    description: 'Create a heading (h1) that says "Welcome to React!"',
    initialCode: `function Challenge() {
  return (
    // Write your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <h1>Welcome to React!</h1>
  );
}`,
    type: 'ui',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'Create a Card',
    description: 'Create a card with a title "My Card" in h2 and text "This is a simple card" in p tag.',
    initialCode: `function Challenge() {
  return (
    // Write your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <div>
      <h2>My Card</h2>
      <p>This is a simple card</p>
    </div>
  );
}`,
    type: 'ui',
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Create a Profile',
    description: 'Create a profile with name "John Doe" in h2 and role "Developer" in p tag.',
    initialCode: `function Challenge() {
  return (
    // Write your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <div>
      <h2>John Doe</h2>
      <p>Developer</p>
    </div>
  );
}`,
    type: 'ui',
    difficulty: 'easy'
  },
  {
    id: 4,
    title: 'Create a List',
    description: 'Create an unordered list (ul) with three items: "Apple", "Banana", and "Orange".',
    initialCode: `function Challenge() {
  return (
    // Write your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
  );
}`,
    type: 'ui',
    difficulty: 'easy'
  },
  {
    id: 5,
    title: 'Create a Navigation',
    description: 'Create a nav element with three links: "Home", "About", and "Contact".',
    initialCode: `function Challenge() {
  return (
    // Write your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <nav>
      <a>Home</a>
      <a>About</a>
      <a>Contact</a>
    </nav>
  );
}`,
    type: 'ui',
    difficulty: 'easy'
  }
];
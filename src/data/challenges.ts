import { Challenge } from '../types/challenge';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Create a Button Component',
    description: 'Create a button component with the text "Click me!" that has padding, rounded corners, and a blue background.',
    initialCode: `function Challenge() {
  return (
    // Your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Click me!
    </button>
  );
}`,
    type: 'ui',
    difficulty: 'easy'
  },
  {
    id: 2,
    title: 'Build a Counter',
    description: 'Create a counter with increment and decrement buttons using useState.',
    initialCode: `function Challenge() {
  // Your code here
  return (
    <div>
    </div>
  );
}`,
    solution: `function Challenge() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount(c => c - 1)} className="px-4 py-2 bg-red-500 text-white rounded-md">-</button>
      <span className="text-xl">{count}</span>
      <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-green-500 text-white rounded-md">+</button>
    </div>
  );
}`,
    type: 'state',
    difficulty: 'easy'
  },
  {
    id: 3,
    title: 'Create a User Card',
    description: 'Build a user card component that displays a name, title, and avatar image.',
    initialCode: `function Challenge() {
  return (
    // Your code here
  );
}`,
    solution: `function Challenge() {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        alt="User avatar"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
        <p className="text-gray-600">Software Engineer</p>
      </div>
    </div>
  );
}`,
    type: 'ui',
    difficulty: 'medium'
  },
  {
    id: 4,
    title: 'Toggle Switch',
    description: 'Create a toggle switch that changes state and appearance when clicked.',
    initialCode: `function Challenge() {
  // Your code here
  return (
    <div>
    </div>
  );
}`,
    solution: `function Challenge() {
  const [isOn, setIsOn] = useState(false);
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={\`w-16 h-8 rounded-full transition-colors \${
        isOn ? 'bg-green-500' : 'bg-gray-300'
      } relative\`}
    >
      <div
        className={\`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform \${
          isOn ? 'translate-x-9' : 'translate-x-1'
        }\`}
      />
    </button>
  );
}`,
    type: 'state',
    difficulty: 'medium'
  },
  {
    id: 5,
    title: 'Task List',
    description: 'Create a list of tasks using .map() and add a delete button for each task.',
    initialCode: `function Challenge() {
  // Your code here
  return (
    <div>
    </div>
  );
}`,
    solution: `function Challenge() {
  const [tasks, setTasks] = useState([
    'Learn React',
    'Build projects',
    'Write documentation'
  ]);

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded">
          <span>{task}</span>
          <button
            onClick={() => deleteTask(index)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}`,
    type: 'list',
    difficulty: 'hard'
  }
];
import React, { useState, useCallback, useEffect } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Timer } from './components/Timer';
import { Preview } from './components/Preview';
import { ChallengePanel } from './components/ChallengePanel';
import { challenges } from './data/challenges';
import { Trophy, Code2, Play } from 'lucide-react';
import type { Challenge } from './types/challenge';
import { Alert } from './components/Alert';
import * as Babel from '@babel/standalone';

function evaluateCode(code: string) {
  try {
    const transformedCode = Babel.transform(code, {
      presets: ['react'],
    }).code;

    const Component = new Function('React', 'useState', `
      ${transformedCode}
      return Challenge;
    `)(React, React.useState);

    return Component;
  } catch (error) {
    console.error('Code evaluation error:', error);
    return null;
  }
}

function App() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0]);
  const [code, setCode] = useState(currentChallenge.initialCode);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          handleTimeUp();
          return 60;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentChallenge.id]);

  const handleTimeUp = useCallback(() => {
    if (!completed.includes(currentChallenge.id)) {
      setAlert({
        type: 'error',
        message: 'Times up! Keep trying - you can do this! 💪'
      });
      setTimeLeft(60);
    }
  }, [currentChallenge.id, completed]);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleSubmit = useCallback(() => {
    try {
      const userComponent = evaluateCode(code);
      const solutionComponent = evaluateCode(currentChallenge.solution);
      
      if (!userComponent || !solutionComponent) {
        setIsCorrect(false);
        setAlert({
          type: 'error',
          message: 'Your code has syntax errors. Make sure your code is valid JavaScript/React.'
        });
        return;
      }

      try {
        const userElement = userComponent({});
        const solutionElement = solutionComponent({});

        const isCorrect = validateComponents(userElement, solutionElement);
        
        setIsCorrect(isCorrect);
        
        if (isCorrect && !completed.includes(currentChallenge.id)) {
          setCompleted([...completed, currentChallenge.id]);
          setAlert({
            type: 'success',
            message: 'Excellent work! Moving to next challenge... 🎉'
          });
          
          const nextIndex = challenges.findIndex(c => c.id === currentChallenge.id) + 1;
          if (nextIndex < challenges.length) {
            setTimeout(() => {
              setCurrentChallenge(challenges[nextIndex]);
              setCode(challenges[nextIndex].initialCode);
              setIsCorrect(null);
              setTimeLeft(60);
            }, 1500);
          }
        } else if (!isCorrect) {
          let errorMessage = 'Not quite right. ';
          if (currentChallenge.type === 'state') {
            errorMessage += 'Make sure you:\n' +
              '1. Used useState hook\n' +
              '2. Added an onClick handler to the button\n' +
              '3. Used conditional rendering (? : or &&)\n' +
              '4. Used the correct element type (button)';
          } else {
            errorMessage += 'Check if you have:\n' +
              '1. Used the correct element type\n' +
              '2. Included the exact text content';
          }
          setAlert({
            type: 'error',
            message: errorMessage
          });
        }
      } catch (error) {
        console.error('Component rendering error:', error);
        setIsCorrect(false);
        setAlert({
          type: 'error',
          message: 'Error rendering your component. Make sure you return valid JSX and use hooks correctly.'
        });
      }
    } catch (error) {
      console.error('Code evaluation error:', error);
      setIsCorrect(false);
      setAlert({
        type: 'error',
        message: 'Error in your code. Make sure you:\n' +
          '1. Have valid JavaScript syntax\n' +
          '2. Use useState at the top level\n' +
          '3. Return valid JSX'
      });
    }
  }, [code, currentChallenge, completed]);

  const handleNext = useCallback(() => {
    const nextIndex = challenges.findIndex(c => c.id === currentChallenge.id) + 1;
    if (nextIndex < challenges.length) {
      setCurrentChallenge(challenges[nextIndex]);
      setCode(challenges[nextIndex].initialCode);
      setIsCorrect(null);
      setTimeLeft(60);
    }
  }, [currentChallenge.id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">React UI Challenge</h1>
          </div>
          <div className="flex items-center gap-4">
            <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>{completed.length} / {challenges.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="space-y-4">
          <ChallengePanel 
            challenge={currentChallenge}
            onSubmit={handleSubmit}
            onNext={handleNext}
            isCorrect={isCorrect}
          />
          <div className="bg-gray-800 rounded-lg overflow-hidden h-[500px]">
            <CodeEditor code={code} onChange={handleCodeChange} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold">Preview</h2>
          </div>
          <div className="bg-white rounded-lg p-4 h-[500px] overflow-auto">
            <Preview code={code} />
          </div>
        </div>
      </main>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}

function validateComponents(
  userElement: React.ReactElement, 
  solutionElement: React.ReactElement
) {
  // Helper to get text content from an element
  const getTextContent = (element: React.ReactElement): string => {
    const getText = (el: any): string => {
      if (typeof el === 'string') return el;
      if (Array.isArray(el)) return el.map(getText).join('');
      if (el?.props?.children) return getText(el.props.children);
      return '';
    };
    return getText(element).replace(/\s+/g, ' ').trim();
  };

  // Helper to compare element types and structure
  const compareElements = (user: React.ReactElement, solution: React.ReactElement): boolean => {
    // Check if element types match
    if (user.type !== solution.type) return false;

    const userChildren = React.Children.toArray(user.props.children);
    const solutionChildren = React.Children.toArray(solution.props.children);

    // Check if number of children match
    if (userChildren.length !== solutionChildren.length) return false;

    // Compare text content if no children
    if (userChildren.length === 0) {
      return getTextContent(user) === getTextContent(solution);
    }

    // Recursively compare children
    return userChildren.every((child, index) => {
      const solutionChild = solutionChildren[index];
      if (React.isValidElement(child) && React.isValidElement(solutionChild)) {
        return compareElements(child, solutionChild);
      }
      return getTextContent(child as any) === getTextContent(solutionChild as any);
    });
  };

  return compareElements(userElement, solutionElement);
}

export default App;
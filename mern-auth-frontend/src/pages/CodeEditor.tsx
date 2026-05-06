import { useState, useEffect } from 'react';
import { executeCode, submitCode } from '../api/code';

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  passed?: boolean;
  error?: string;
}

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  testCases: TestCase[];
}

const problems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 9, so we return [0, 1].',
      },
    ],
    testCases: [
      { id: 1, input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { id: 2, input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { id: 3, input: '[3,3], 6', expectedOutput: '[0,1]' },
    ],
  },
  {
    id: 2,
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string array in-place with O(1) space.',
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: 'The string "hello" becomes "olleh".',
      },
    ],
    testCases: [
      { id: 1, input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { id: 2, input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
      { id: 3, input: '["a"]', expectedOutput: '["a"]' },
    ],
  },
  {
    id: 3,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Determine if brackets are balanced and in correct order.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'Valid parentheses.',
      },
    ],
    testCases: [
      { id: 1, input: '"()"', expectedOutput: 'true' },
      { id: 2, input: '"{[]}"', expectedOutput: 'true' },
      { id: 3, input: '"(]"', expectedOutput: 'false' },
    ],
  },
];

const analyzCode = (code: string, problemId: number): string[] => {
  const hints: string[] = [];
  const hasFunction = /function|const|let|var/.test(code);
  const hasLoop = /for|while/.test(code);
  const hasConditional = /if|else/.test(code);
  const hasReturn = /return/.test(code);
  const lineCount = code.split('\n').length;

  if (problemId === 1) {
    // Two Sum dynamic analysis
    if (!hasFunction) {
      hints.push('🔴 Missing: Function declaration. Start with `function solve(nums, target) {`');
    }
    if (!hasLoop) {
      hints.push('🔴 Missing: Loop to iterate through array. Use `for` or `while`');
    }
    if (!hasConditional) {
      hints.push('🔴 Missing: Conditional check. You need `if` to check if complement exists');
    }
    if (!hasReturn) {
      hints.push('🔴 Missing: Return statement. You must return the result');
    }
    if (/map|Map|object|{}/.test(code)) {
      hints.push('✅ Good: Using a data structure to store values - efficient approach!');
    }
    if (/complement|difference|target\s*-/.test(code)) {
      hints.push('✅ Good: Calculating the complement - you\'re on the right track!');
    }
    if (code.includes('return') && !code.includes('[')) {
      hints.push('⚠️ Warning: Make sure you\'re returning an array of indices, not just values');
    }
  } else if (problemId === 2) {
    // Reverse String dynamic analysis
    if (!hasFunction) {
      hints.push('🔴 Missing: Function declaration. Start with `function reverse(s) {`');
    }
    if (!(/\[|\]/.test(code))) {
      hints.push('🔴 Missing: Array indexing. Use `s[i]` to access elements');
    }
    if (!hasLoop) {
      hints.push('🔴 Missing: Loop. You need to iterate through array indices');
    }
    if (!/left|right|start|end|i|j/.test(code)) {
      hints.push('🔴 Missing: Pointer variables. Create `left` and `right` pointers');
    }
    if (/\[.*\]\s*=|swap|temp/.test(code)) {
      hints.push('✅ Good: Swapping elements - correct approach for in-place reversal!');
    }
    if (/length|\.length/.test(code)) {
      hints.push('✅ Good: Using array length - you have the boundary information!');
    }
    if (/while.*\s*<|for.*\s*i\s*</.test(code)) {
      hints.push('✅ Good: Loop structure looks correct. Check your boundary condition!');
    }
  } else if (problemId === 3) {
    // Valid Parentheses dynamic analysis
    if (!hasFunction) {
      hints.push('🔴 Missing: Function declaration. Start with `function isValid(s) {`');
    }
    if (!(/stack|Stack|\[\]/.test(code))) {
      hints.push('🔴 Missing: Stack implementation. Use an array `const stack = []`');
    }
    if (!hasLoop) {
      hints.push('🔴 Missing: Loop. You need to iterate through each character');
    }
    if (!/for.*in|for.*of|for.*let/.test(code)) {
      hints.push('⚠️ Tip: Use `for...of` loop for iterating through string characters');
    }
    if (!hasConditional) {
      hints.push('🔴 Missing: Conditional logic. Check if bracket is opening or closing');
    }
    if (/push|map|object|match/.test(code)) {
      hints.push('✅ Good: Using push or mapping - correct for stack operations!');
    }
    if (/pop|\.length\s*===\s*0/.test(code)) {
      hints.push('✅ Good: Using pop and checking stack empty - excellent!');
    }
    if (code.includes('return')) {
      hints.push('✅ Good: You have a return statement. Make sure it returns boolean!');
    }
  }

  if (lineCount < 3) {
    hints.push('💭 Thought: Your code is very short. Consider if you\'ve covered all logic');
  }

  return hints;
};

export function CodeEditor() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [code, setCode] = useState('// Write your solution here\nfunction solve() {\n  \n}');
  const [output, setOutput] = useState('');
  const [hints, setHints] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const generatedHints = analyzCode(code, selectedProblem.id);
    setHints(generatedHints);
  }, [code, selectedProblem.id]);

  const handleRunTests = async () => {
    if (!token) {
      setOutput('❌ Authentication required. Please login first.');
      return;
    }

    setLoading(true);
    setOutput('⏳ Running tests...');

    try {
      const response = await executeCode(selectedProblem.id, code, language, token);

      if (response.data.success) {
        const { results, summary, compilationError } = response.data;

        // Update test results
        const testCasesWithResults = selectedProblem.testCases.map(tc => {
          const result = results.find((r: any) => r.id === tc.id);
          return {
            ...tc,
            passed: result?.passed,
            error: result?.error,
          };
        });

        setTestResults(testCasesWithResults);

        // Update output
        const outputText = compilationError
          ? `❌ Compilation Error:\n${compilationError}`
          : `✅ Test Execution Complete\n\nPassed: ${summary.passed}/${summary.total}\nPass Rate: ${summary.passPercentage}%\n${
              summary.passed === summary.total ? '🎉 All tests passed!' : '⚠️ Some tests failed'
            }`;

        setOutput(outputText);
      } else {
        setOutput(`❌ Error: ${response.data.message}`);
      }
    } catch (error: any) {
      setOutput(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      setOutput('❌ Authentication required. Please login first.');
      return;
    }

    setLoading(true);
    setOutput('⏳ Submitting solution...');

    try {
      const response = await submitCode(selectedProblem.id, code, language, token);

      if (response.data.success) {
        setOutput(response.data.message);
        
        // Update test results
        const testCasesWithResults = selectedProblem.testCases.map(tc => {
          const result = response.data.results.find((r: any) => r.id === tc.id);
          return {
            ...tc,
            passed: result?.passed,
            error: result?.error,
          };
        });

        setTestResults(testCasesWithResults);
      } else {
        setOutput(`❌ Error: ${response.data.message}`);
      }
    } catch (error: any) {
      setOutput(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'from-green-400 to-green-600';
      case 'Medium':
        return 'from-yellow-400 to-yellow-600';
      case 'Hard':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2">💻 DSA Code Master</h1>
          <p className="text-blue-300">Practice coding problems and get intelligent hints</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Problems List */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-4">📋 Problems</h2>
              <div className="space-y-3">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => {
                      setSelectedProblem(problem);
                      setTestResults([]);
                      setOutput('');
                    }}
                    className={`w-full text-left p-4 rounded-lg transition duration-300 transform hover:scale-105 ${
                      selectedProblem.id === problem.id
                        ? `bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white shadow-lg`
                        : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold text-sm">{problem.title}</div>
                    <div className={`text-xs mt-1 ${getDifficultyTextColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Editor and Tests */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Description */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">{selectedProblem.title}</h2>
                <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getDifficultyColor(selectedProblem.difficulty)}`}>
                  {selectedProblem.difficulty}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">{selectedProblem.description}</p>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">📌 Examples</h3>
                <div className="space-y-3">
                  {selectedProblem.examples.map((example, idx) => (
                    <div key={idx} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <div className="mb-2 text-gray-200">
                        <span className="font-bold text-blue-400">Input:</span> {example.input}
                      </div>
                      <div className="mb-2 text-gray-200">
                        <span className="font-bold text-green-400">Output:</span> {example.output}
                      </div>
                      <div className="text-gray-400 text-sm">{example.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">✍️ Code Editor</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-80 p-4 font-mono text-sm bg-gray-950 text-green-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your solution here..."
                spellCheck="false"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleRunTests}
                  disabled={loading}
                  className={`px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-green-700'
                  }`}
                >
                  {loading ? '⏳ Running...' : '▶️ Run Tests'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  {loading ? '⏳ Submitting...' : '📝 Submit'}
                </button>
              </div>
            </div>

            {/* Test Cases */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">🧪 Test Cases</h3>
              <div className="space-y-2">
                {selectedProblem.testCases.map((testCase, idx) => (
                  <div
                    key={testCase.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      testResults.find(r => r.id === testCase.id)?.passed
                        ? 'bg-green-900 border-green-500 text-green-100'
                        : testResults.find(r => r.id === testCase.id)
                        ? 'bg-red-900 border-red-500 text-red-100'
                        : 'bg-gray-700 border-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-sm">
                        <span className="text-blue-300">Case {idx + 1}:</span> {testCase.input}
                      </div>
                      {testResults.find(r => r.id === testCase.id)?.passed ? (
                        <span className="text-emerald-300 font-extrabold">✅ PASS</span>
                      ) : testResults.find(r => r.id === testCase.id) ? (
                        <span className="text-rose-300 font-extrabold">❌ FAIL</span>
                      ) : (
                        <span className="text-gray-400 font-bold">⏳ PENDING</span>
                      )}
                    </div>
                    <div className="text-xs mt-2 text-gray-400">Expected: {testCase.expectedOutput}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Hints */}
            {hints.length > 0 && (
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl shadow-2xl p-6 border border-purple-600">
                <h3 className="text-xl font-bold text-white mb-4">💡 Smart Hints</h3>
                <div className="space-y-2">
                  {hints.map((hint, idx) => (
                    <div key={idx} className="bg-purple-950 p-3 rounded-lg border border-purple-600 text-purple-100 text-sm flex items-start gap-2">
                      <span className="mt-0.5">{hint.substring(0, 2)}</span>
                      <span>{hint.substring(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Output */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">📊 Output</h3>
              <div className="bg-gray-950 text-green-200 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap min-h-24 border border-slate-800 shadow-inner">
                {output || '💬 Output will appear here after running tests...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

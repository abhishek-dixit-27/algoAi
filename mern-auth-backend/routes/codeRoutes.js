const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

/**
 * Test Case Execution System
 */

// Sample problems with test cases
const problems = {
  1: {
    title: 'Two Sum',
    testCases: [
      { id: 1, input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: [0, 1] },
      { id: 2, input: { nums: [3, 2, 4], target: 6 }, expectedOutput: [1, 2] },
      { id: 3, input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] },
    ],
  },
  2: {
    title: 'Reverse String',
    testCases: [
      { id: 1, input: { s: ['h', 'e', 'l', 'l', 'o'] }, expectedOutput: ['o', 'l', 'l', 'e', 'h'] },
      { id: 2, input: { s: ['H', 'a', 'n', 'n', 'a', 'h'] }, expectedOutput: ['h', 'a', 'n', 'n', 'a', 'H'] },
      { id: 3, input: { s: ['a'] }, expectedOutput: ['a'] },
    ],
  },
  3: {
    title: 'Valid Parentheses',
    testCases: [
      { id: 1, input: { s: '()' }, expectedOutput: true },
      { id: 2, input: { s: '{}[]' }, expectedOutput: true },
      { id: 3, input: { s: '(]' }, expectedOutput: false },
    ],
  },
};

/**
 * Execute code with test cases
 * POST /api/code/execute
 */
router.post('/execute', auth, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    // Validate input
    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Please provide problemId, code, and language',
      });
    }

    // Get problem test cases
    const problem = problems[problemId];
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    // Execute code with test cases (JavaScript only for now)
    if (language !== 'javascript') {
      return res.status(400).json({
        success: false,
        message: 'Only JavaScript is supported at the moment',
      });
    }

    const results = [];
    let compilationError = null;

    try {
      // Create a function from the code
      const userFunction = new Function('nums', 'target', 's', code + '; return solve ? solve(...arguments) : null;');

      // Run each test case
      for (const testCase of problem.testCases) {
        try {
          let output;
          if (problemId === 1) {
            output = userFunction(testCase.input.nums, testCase.input.target);
          } else if (problemId === 2) {
            output = userFunction(testCase.input.s);
          } else if (problemId === 3) {
            output = userFunction(testCase.input.s);
          }

          // Check if output matches expected output
          const passed = JSON.stringify(output) === JSON.stringify(testCase.expectedOutput);

          results.push({
            id: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: output,
            passed,
            error: null,
          });
        } catch (error) {
          results.push({
            id: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: null,
            passed: false,
            error: error.message,
          });
        }
      }
    } catch (error) {
      compilationError = error.message;
    }

    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;

    res.status(200).json({
      success: true,
      problemId,
      problemTitle: problem.title,
      results,
      summary: {
        passed: passedCount,
        total: totalCount,
        passPercentage: Math.round((passedCount / totalCount) * 100),
      },
      compilationError,
    });
  } catch (error) {
    console.error('Code Execution Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error executing code',
    });
  }
});

/**
 * Get all problems
 * GET /api/code/problems
 */
router.get('/problems', auth, async (req, res) => {
  try {
    const problemList = Object.entries(problems).map(([id, problem]) => ({
      id: parseInt(id),
      title: problem.title,
      testCaseCount: problem.testCases.length,
    }));

    res.status(200).json({
      success: true,
      problems: problemList,
    });
  } catch (error) {
    console.error('Get Problems Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching problems',
    });
  }
});

/**
 * Get specific problem with test cases
 * GET /api/code/problems/:problemId
 */
router.get('/problems/:problemId', auth, async (req, res) => {
  try {
    const { problemId } = req.params;
    const problem = problems[problemId];

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    res.status(200).json({
      success: true,
      id: parseInt(problemId),
      title: problem.title,
      testCases: problem.testCases,
    });
  } catch (error) {
    console.error('Get Problem Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching problem',
    });
  }
});

/**
 * Submit solution for evaluation
 * POST /api/code/submit
 */
router.post('/submit', auth, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    // First execute the code
    const executeRes = await new Promise((resolve) => {
      const mockReq = { body: { problemId, code, language }, user: req.user };
      const mockRes = {
        status: (code) => ({
          json: (data) => resolve(data),
        }),
      };

      // Call execute logic
      const problem = problems[problemId];
      if (!problem) {
        resolve({
          success: false,
          message: 'Problem not found',
        });
        return;
      }

      const results = [];
      try {
        const userFunction = new Function('nums', 'target', 's', code + '; return solve ? solve(...arguments) : null;');

        for (const testCase of problem.testCases) {
          try {
            let output;
            if (problemId === 1) {
              output = userFunction(testCase.input.nums, testCase.input.target);
            } else if (problemId === 2) {
              output = userFunction(testCase.input.s);
            } else if (problemId === 3) {
              output = userFunction(testCase.input.s);
            }

            const passed = JSON.stringify(output) === JSON.stringify(testCase.expectedOutput);
            results.push({
              id: testCase.id,
              passed,
              error: null,
            });
          } catch (error) {
            results.push({
              id: testCase.id,
              passed: false,
              error: error.message,
            });
          }
        }

        const passedCount = results.filter(r => r.passed).length;
        const allPassed = passedCount === results.length;

        resolve({
          success: true,
          submitted: true,
          problemId,
          allPassed,
          results,
          message: allPassed ? '✅ All tests passed! Congratulations!' : '⚠️ Some tests failed. Keep trying!',
        });
      } catch (error) {
        resolve({
          success: false,
          message: error.message,
        });
      }
    });

    res.status(200).json(executeRes);
  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting solution',
    });
  }
});

module.exports = router;

// Pattern: Pass/Fail Patterns
// This pattern tests a function to ensure it produces the expected output.
test("pass/fail test for sum function", () => {
  const sum = (a, b) => {
    return a + b;
  };
  
  expect(sum(1, 2)).toBe(3); // should pass
  expect(sum(2, 2)).not.toBe(5); // should fail if sum is 5
});

// Pattern: Collection Management Patterns
// This pattern verifies the behavior of adding an item to a collection (array).
test("collection management test for adding an item", () => {
  const addItem = (array, item) => {
    return [...array, item];
  };
  
  const array = [1, 2];
  const newArray = addItem(array, 3);
  expect(newArray).toEqual([1, 2, 3]);
});

// Pattern: Data-Driven Patterns
// This pattern tests a function with multiple sets of inputs to ensure consistent behavior.
const multiply = (a, b) => {
  return a * b;
};

test.each([
  [2, 3, 6],
  [4, 5, 20],
  [0, 5, 0],
])(
  "data-driven test for multiply function (%i * %i = %i)",
  (a, b, expected) => {
    expect(multiply(a, b)).toBe(expected);
  }
);

// Pattern: Performance Patterns
// This pattern assesses the performance of a function to ensure it meets time constraints.
test("performance test for heavyComputation", () => {
  const heavyComputation = (iterations) => {
    let result = 0;
    for (let i = 0; i < iterations; i++) {
      result += i; // Simulate a computational load
    }
    return result;
  };
  
  const start = Date.now();
  heavyComputation(1000000);
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(1000); // test it finishes in less than 1 second
});

// Pattern: Process Patterns
// This pattern tests the step-by-step processing of a value through a sequence of transformations.
const processSteps = (val) => {
  let step1 = val + 1;
  let step2 = step1 * 2;
  return step2 - 3;
};

test("process pattern test", () => {
  const result = processSteps(5);
  expect(result).toBe(9); // (5 + 1) * 2 - 3 = 9
});

// Pattern: Simulation Patterns
// This pattern simulates the behavior of asynchronous operations, such as fetching data.
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

test("simulation test with mock fetch", async () => {
  const mockResponse = { data: "Hello" };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  );

  const result = await fetchData("https://api.example.com/data");
  expect(result).toEqual(mockResponse);
});

// Pattern: Multithreading Patterns
// This pattern tests asynchronous functions to ensure they operate correctly in a non-blocking manner.
const asyncFunction = () => new Promise(resolve => setTimeout(() => resolve('done'), 500));

test('multithreading (asynchronous) test', async () => {
  const result = await asyncFunction();
  expect(result).toBe('done');
});

// Pattern: Stress Test Patterns
// This pattern evaluates the function's performance and behavior under high load or large input.
const stressTest = (num) => Array(num).fill(0).map((_, i) => i);

test('stress test with large input', () => {
  const largeInput = 1000000;
  const result = stressTest(largeInput);

  expect(result.length).toBe(largeInput);
});

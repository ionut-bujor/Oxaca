
export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export interface SuiteResult {
  name: string;
  results: TestResult[];
}

export const expect = (actual: any) => ({
  toBe: (expected: any) => {
    if (actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    }
  },
  toEqual: (expected: any) => {
    const a = JSON.stringify(actual);
    const b = JSON.stringify(expected);
    if (a !== b) {
      throw new Error(`Expected ${b}, but got ${a}`);
    }
  },
  toInclude: (expected: any) => {
    if (!Array.isArray(actual) || !actual.includes(expected)) {
      throw new Error(`Expected ${JSON.stringify(actual)} to include ${JSON.stringify(expected)}`);
    }
  },
  toThrow: () => {
    let threw = false;
    try {
      actual();
    } catch {
      threw = true;
    }
    if (!threw) throw new Error("Expected function to throw, but it did not.");
  }
});

type TestFn = () => void | Promise<void>;

class TestSuite {
  private currentSuite: string = '';
  private suites: Map<string, { name: string; fn: TestFn }[]> = new Map();

  describe(name: string, fn: () => void) {
    this.currentSuite = name;
    this.suites.set(name, []);
    fn();
  }

  it(name: string, fn: TestFn) {
    this.suites.get(this.currentSuite)?.push({ name, fn });
  }

  async run(): Promise<SuiteResult[]> {
    const reports: SuiteResult[] = [];
    for (const [suiteName, tests] of this.suites.entries()) {
      const suiteReport: SuiteResult = { name: suiteName, results: [] };
      for (const test of tests) {
        try {
          await test.fn();
          suiteReport.results.push({ name: test.name, passed: true });
        } catch (e: any) {
          suiteReport.results.push({ name: test.name, passed: false, error: e.message });
        }
      }
      reports.push(suiteReport);
    }
    return reports;
  }
}

export const suite = new TestSuite();

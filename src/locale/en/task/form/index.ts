import { steps } from './steps';
import { validation } from './validation';

export const form = {
  steps,
  validation,
  title: 'Title',
  complexity: 'Complexity (%)',
  description: 'Description',
  inputFormat: 'Input description',
  outputFormat: 'Output description',
  inputExample: 'Input example',
  outputExample: 'Output example',
  grade: 'Grade',
  constraints: {
    title: 'Constraints',
    time: 'Time (seconds)',
    memory: 'Memory (Mb)',
  },
  checkTypes: ['Tests', 'Checker'],
  taskTypes: ['Code task', 'Text task'],
  checkType: 'Check type',
  taskType: 'Task type',
  checker: 'Checker',
  hint: {
    title: 'Hint',
    alarmType: 'Hint alarm type',
    hintAlarmTypes: ['Attempts', 'Timestamp (minutes)'],
    text: 'Hint text',
    showAfter: 'Show hint after',
  },
  remark: 'Remark',
  tests: 'Tests',
  emptyTests: 'Add tests using button below or frug files here',
  inputTest: 'Input',
  outputTest: 'Output',
  test: 'Test',
  example: 'Example',
  allowed: 'Allowed',
  forbidden: 'Forbidden',
  restrictLanguages: 'Restrict languages',
};

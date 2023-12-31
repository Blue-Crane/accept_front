import { steps } from './steps';
import { validation } from './validation';
export const form = {
  steps,
  validation,
  title: 'Title',
  description: 'Description',
  defaultDuration: 'Default duration (minutes)',
  taskOrdering: {
    title: 'Change the tasks order if necessary',
  },
  taskSelector: {
    available: 'Available tasks',
    used: 'Used tasks',
  },
};

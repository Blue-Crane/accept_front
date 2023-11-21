export const form = {
  spec: 'Short name',
  title: 'Title',
  logo: 'Logo',
  email: 'Email',
  description: 'Description',
  activeUntil: 'Active until',
  principal: 'Responsible person',
  steps: {
    labels: ['First step', 'Second step', 'Final step'],
    descriptions: ['Main info', 'Extra info', 'Preview'],
  },

  validation: {
    specLength: 'Spec is too short',
    specSymbols: 'Spec has unavaliable symbols',
    title: 'Title is too short',
    description: 'Description is too short',
    email: 'Incorrect email',
    activeUntil: 'Select subscription ending date',
    principal: 'Enter login of responsible person',
  },
};

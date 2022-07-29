export const task = {
  taskType: [
    'The Code task implies that the user submits the code as a solution.',
    'As a solution to the Text task, the user sends only an answer - a text string',
  ],
  restrictLanguages: [
    'You can limit the languages that will be available to users when submitting a solution to this problem',
    'If the "Allowed" option is selected, only the selected languages will be available',
    'If the "Forbidden" option is selected, all languages will be available except the selected ones',
    'If you do not restrict the languages used, then all will be available',
  ],
  checker: [
    "The checker is firstly read the test input data, and then (from a new line) the result of the user's program execution",
    'To mark an answer as correct, the checker must return 1. Any other result from the checker marks the answer as incorrect',
    'Example of a checker for the task "Increase the number by 1" in Python:',
    'test_input=int(input()); user_output=int(input()); print(1 if user_output - test_input == 1 else 0); ',
  ],
};
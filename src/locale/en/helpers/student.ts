export const student = {
  errors: [
    'Warnings and errors mean that user was not added to database',
    'You can fix these errors and warnings and resend your table',
    'Users which not shown on "Errors" tab where added to database',
  ],
  tableFormat: [
    'Table must have following columns (in any order): login, fullName, grade, password',
    'login - user`s login must be unique; cannot be empty',
    'fullName - user`s full name; between each words there must be exactly one space; can consist of 3 or 2 (in case of absence of patronymic) words',
    'grade - group to which user will be added; group must be in such form: `11 A`, cannot be empty',
    'password - user`s password; cannot be empty',
    'In case if the grade does not exist, you can create it on the corresponding tab',
  ],
  attention: [
    'Creation of users may take some time (5-10 minutes)',
    "During creation some site's features may not work correctly",
    "Due to this, we recommend to add students when the site's load is low",
  ],
};

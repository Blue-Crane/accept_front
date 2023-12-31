export const student = {
  errors: [
    'Предупреждение и ошибка означают, что пользователь не был добавлен в базу данных',
    'Вы можете исправить эти ошибки и отправить таблицу повторно',
    'Пользователи которые не перечислены во вкладке "Ошибки" были добавлены в базу данных',
  ],
  tableFormat: [
    'Таблица должна содержать четыре поля (в любом порядке):  login, fullName, grade, password',
    'login - логин пользователя должен быть уникальным; не может быть пустым полем',
    'fullName - ФИО пользователя; между каждым словом должно быть не более одного пробела; может содержать 3 или 2 (в случае отсутствия отчества) слова',
    'grade - группа в которую будет добавлен пользователь; группа должна иметь следующий вид: "11 A"; не может быть пустым полем;',
    'password - пароль пользователя; не может быть пустым полем',
    'В случае отсутствия необходимой группы (класса), вы можете добавить её в соответствующей вкладке',
  ],
  attention: [
    'Добавление пользователей может занять некоторое время (5-10 минут)',
    'В течение этого времени некоторые функции сайта могут работать некорректно',
    'В связи с этим рекомендуем добавлять пользователей в период низкой активности сайта',
  ],
};

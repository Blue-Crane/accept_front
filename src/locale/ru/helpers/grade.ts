export const grade = {
  errors: [
    'Предупреждение и ошибка означают, что класс пользователя не был изменён',
    'Вы можете исправить эти ошибки и отправить таблицу повторно',
    'Класс пользователей, не перечисленных во вкладке "Ошибки", был успешно изменён',
  ],
  tableFormat: [
    'Таблица должна содержать два поля (в любом порядке):  login, grade',
    'login - логин пользователя должен быть уникальным; не может быть пустым полем',
    'grade - группа в которую будет добавлен пользователь; группа должна иметь следующий вид: `11 A`; не может быть пустым полем;',
    'В случае отсутствия необходимой группы (класса), вы можете добавить её в соответствующей вкладке',
    'Старые классы будут удалены и заменены новыми; в связи с чем все активности связанные с классами станут не действительны',
  ],
  attention: [
    'Изменение классов может занять некоторое время (5-10 минут)',
    'В течение этого времени некоторые функции сайта могут работать некорректно',
    'В связи с этим рекомендуем изменять классы период низкой активности сайта',
  ],
};
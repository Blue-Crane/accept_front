import { projects } from './projects';
import { auth } from './auth';
import { task } from './task';
import { assignmentSchema } from './assignmentSchema';
import { assignment } from './assignment';
import { notify } from './notify';
import { tournament } from './tournament';
import { attempt } from './attempt';
import { form, placeholders } from './form';
import { credentials, mainHeaderLinks } from './layout';
import { date, months } from './date';
import { users } from './users';
import { errorPage } from './errorPage';
import { group } from './group';
import { ui } from './ui';
import { helpers } from './helpers';
import { tag } from './tag';
import { notification } from './notification';

const ru = {
  accept: 'Accept',
  loading: 'Загрузка',
  name: 'Название',
  save: 'Сохранить',
  delete: 'Удалить',
  cancel: 'Отмена',
  yes: 'Да',
  no: 'Нет',
  sure: 'Я уверен(а)',
  error: 'Ошибка',
  success: 'Успешно',
  language: 'Язык',
  all: 'Все',
  create: 'Создать',
  edit: 'Изменить',
  toList: 'К списку',
  validationError: 'Ошибка валидации',
  assignmentSchema,
  assignment,
  attempt,
  group,
  placeholders,
  credentials,
  mainHeaderLinks,
  projects,
  date,
  months,
  auth,
  task,
  form,
  users,
  notify,
  errorPage,
  tournament,
  ui,
  helpers,
  tag,
  notification,
};

export default ru;

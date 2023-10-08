import { assignmentSchema } from './assignmentSchema';
import { assignment } from './assignment';
import { attempt } from './attempt';
import { task } from './task';
import { group } from './group';
import { auth } from './auth';
import { profile } from './profile';
import { notification } from './notification';
import { tournament } from './tournament';
import { tournament_task } from './tournament_task';
import { students } from './students';
import { user } from './user';
import { feedback } from './feedback';
import { executor } from './executor';
import { task_test } from './task_test';
import { test_group } from './test_group';
import { team } from './team';
import { analytics } from './analytics';

export const notify = {
  errors: {
    unauthorized: 'Вы не авторизованы',
  },
  assignmentSchema,
  assignment,
  attempt,
  task,
  group,
  auth,
  tournament,
  tournament_task,
  notification,
  profile,
  students,
  user,
  feedback,
  executor,
  task_test,
  test_group,
  team,
  analytics,
};

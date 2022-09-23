import IHeaderLink from '@custom-types/ui/IHeaderLink';

const projectLinks: IHeaderLink[] = [
  {
    text: (locale) => locale.projects.education.title,
    type: 'regular',
    href: '/edu',
  },
  {
    text: (locale) => locale.projects.courses.title,
    type: 'regular',
    href: '/courses',
  },
  {
    text: (locale) => locale.projects.tournaments.title,
    type: 'regular',
    href: '/tournaments',
  },
];

const listLinks: IHeaderLink[] = [
  {
    text: (locale) => locale.mainHeaderLinks.listLinks.tasks,
    type: 'regular',
    href: '/task/list',
  },
  {
    text: (locale) => locale.mainHeaderLinks.listLinks.groups,
    type: 'regular',
    href: '/group/list',
    permission: 'teacher',
  },
  {
    text: (locale) => locale.mainHeaderLinks.listLinks.schemas,
    type: 'regular',
    href: '/assignment_schema/list',
    permission: 'teacher',
  },
  {
    text: (locale) => locale.mainHeaderLinks.listLinks.users,
    type: 'regular',
    href: '/user/list',
    permission: 'teacher',
  },
];

export const links: IHeaderLink[] = [
  {
    text: (locale) => locale.mainHeaderLinks.main,
    type: 'regular',
    href: '/',
  },
  {
    text: (locale) => locale.mainHeaderLinks.projects,
    type: 'dropdown',
    href: '',
    links: projectLinks,
  },
  {
    text: (locale) => locale.mainHeaderLinks.lists,
    type: 'dropdown',
    href: '',
    links: listLinks,
  },
  {
    text: (locale) => locale.mainHeaderLinks.about,
    type: 'regular',
    href: '/about',
  },
];

import { IProjectCard } from '@custom-types/IProjectCard';

export const cardList: IProjectCard[] = [
  {
    title: (locale) => locale.projects.education.title,
    description: (locale) => locale.projects.education.description,
    image: 'media/code0.jpg',
    href: '/edu/task/list',
  },
  {
    title: (locale) => locale.projects.courses.title,
    description: (locale) => locale.projects.courses.description,
    image: 'media/code1.jpg',
    href: '/courses',
  },
  {
    title: (locale) => locale.projects.tournaments.title,
    description: (locale) => locale.projects.tournaments.description,
    image: 'media/code2.jpg',
    href: '/tourneys',
  },
];

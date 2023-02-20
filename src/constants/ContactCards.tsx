import { IContactCard } from '@custom-types/ui/IContactCard';
import { ILocale } from '@custom-types/ui/ILocale';
import {
  BrandTelegram,
  BrandVk,
  CurrencyRubel,
  Mail,
} from 'tabler-icons-react';

const iconSize = 25;

export const cardContent: (_: ILocale) => IContactCard[] = (
  locale
) => [
  {
    title: locale.contacts.mail.title,
    description: locale.contacts.mail.description,
    contacts: [
      {
        icon: <Mail size={iconSize} />,
        text: 'bluecrane.accept@gmail.com',
        href: 'mailto:bluecrane.accept@gmail.com',
      },
    ],
  },
  {
    title: locale.contacts.socials.title,
    description: locale.contacts.socials.description,
    contacts: [
      {
        icon: <BrandVk size={iconSize} />,
        text: 'VK',
        href: 'https://vk.com/dsomni',
      },
      {
        icon: <BrandTelegram size={iconSize} />,
        text: 'Telegram',
        href: 'https://t.me/flip_floppa',
      },
      {
        icon: <BrandTelegram size={iconSize} />,
        text: 'Telegram',
        href: 'https://t.me/Melaveeta',
      },
    ],
  },
  {
    title: locale.contacts.support.title,
    description: locale.contacts.support.description,
    contacts: [
      {
        icon: <CurrencyRubel size={iconSize} />,
        text: '5536913884507415',
      },
      {
        icon: <CurrencyRubel size={iconSize} />,
        text: '2200700169032637',
      },
    ],
  },
];
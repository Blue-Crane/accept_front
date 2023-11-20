export const form = {
  spec: 'Короткое название',
  title: 'Название',
  logo: 'Логотип',
  email: 'Email',
  description: 'Описание',
  activeUntil: 'Дата окончания подписки',
  steps: {
    labels: ['Шаг первый', 'Шаг второй', 'Последний шаг'],
    descriptions: [
      'Основная информация',
      'Дополнительная информация',
      'Предпросмотр',
    ],
  },

  validation: {
    specLength: 'Длина spec слишком мала',
    specSymbols: 'spec содержит недопустимые символы',
    title: 'Название слишком короткое',
    description: 'Описание слишком короткое',
    email: 'Недопустимый email',
    activeUntil: 'Выберите дату окончания подписки',
  },
};

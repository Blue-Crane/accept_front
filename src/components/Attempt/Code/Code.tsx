import { IAttempt } from '@custom-types/data/IAttempt';
import { FC, memo } from 'react';
import { Prism as MantinePrism } from '@mantine/prism';
import { ILanguage } from '@custom-types/data/atomic';
import styles from './code.module.css';
// @ts-ignore
import Prism from 'prism-react-renderer/prism';
import { useLocale } from '@hooks/useLocale';
// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-java');
require('prismjs/components/prism-pascal');

const getLang = (language: ILanguage): any => {
  switch (language.shortName) {
    case 'cpp':
      return 'cpp';
    case 'python':
      return 'python';
    case 'pypy':
      return 'python';
    case 'java':
      return 'java';
    case 'pascal':
      return 'pascal';
    default:
      return '';
  }
};

const Code: FC<{ attempt: IAttempt }> = ({ attempt }) => {
  const { locale } = useLocale();

  return (
    <div className={styles.codeWrapper}>
      <MantinePrism
        language={getLang(attempt.language)}
        copyLabel={locale.copy.label}
        copiedLabel={locale.copy.done}
        withLineNumbers
      >
        {attempt.programText}
      </MantinePrism>
    </div>
  );
};

export default memo(Code);

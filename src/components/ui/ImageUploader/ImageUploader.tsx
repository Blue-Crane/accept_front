import { setter } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { FileInput, FileInputProps } from '@mantine/core';
import { InputWrapper } from '@ui/basics';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import { DEFAULT_AUTO_CLOSE } from '@utils/requestWithNotify';
import { FC, memo, useCallback, useState } from 'react';

interface ImageUploaderProps extends FileInputProps {
  setUrl: setter<string>;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  setUrl,
  defaultValue,
  label,
  ...props
}) => {
  const [image, setImage] = useState<File | null>(null);
  const { locale, lang } = useLocale();

  const uploadImage = useCallback((payload: File | null) => {
    if (!payload) return;
    setImage(payload);
    var data = new FormData();
    data.append('upload', payload);

    const notificationLocale = locale.notify.image.upload;

    const id = newNotification({
      title: notificationLocale.loading,
      message: notificationLocale.loading + '...',
    });

    fetch('/api/image', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (!!res.url) {
          setUrl(res.url);
          successNotification({
            id,
            title: locale.success,
            message: notificationLocale.success,
            autoClose: DEFAULT_AUTO_CLOSE,
          });
        } else {
          errorNotification({
            id,
            title: locale.error,
            message:
              res.detail.description &&
              res.detail.description[lang] != undefined
                ? res.detail.description[lang]
                : res.detail,
            autoClose: DEFAULT_AUTO_CLOSE,
          });
        }
      })
      .catch((e) => {
        errorNotification({
          id,
          title: locale.error,
          message: notificationLocale.error,
        });
      });
  }, []);

  return (
    // @ts-expect-error
    <InputWrapper label={label} {...props}>
      <FileInput
        accept="image/png,image/jpeg,image/svg"
        value={image}
        onChange={uploadImage}
        defaultValue={defaultValue}
        {...props}
      />
    </InputWrapper>
  );
};

export default memo(ImageUploader);

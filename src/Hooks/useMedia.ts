import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import ImagePicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';

function useMedia(callback?: (media: ImageOrVideo, options: Options) => void) {
  const [mediaData, setMediaData] = useState<Array<ImageOrVideo>>([]);

  const remove = useCallback(
    (index: number) => {
      setMediaData([...mediaData].filter((_, _index) => _index !== index));
    },
    [mediaData],
  );

  const launchCamera = useCallback(
    async (options: Options = {mediaType: 'photo', multiple: false}) => {
      try {
        const media = await ImagePicker.openCamera(options);
        callback?.(media, options);
        if (options.multiple) {
          setMediaData([...mediaData, media]);
        } else {
          setMediaData([media]);
        }
      } catch (error) {}
    },
    [callback, mediaData],
  );

  const launchGallery = useCallback(
    async (options: Options = {mediaType: 'photo', multiple: false}) => {
      try {
        const media = await ImagePicker.openPicker(options);
        callback?.(media, options);
        if (options.multiple) {
          setMediaData([...mediaData, media]);
        } else {
          setMediaData([media]);
        }
      } catch (error) {}
    },
    [callback, mediaData],
  );

  const launch = useCallback(
    (
      title: string,
      description: string = '',
      options: Options = {
        mediaType: 'photo',
        multiple: false,
        compressImageQuality: 0.5,
      },
    ) => {
      Alert.alert(title, description, [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(options);
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchGallery(options);
          },
        },
      ]);
    },
    [launchCamera, launchGallery],
  );

  return {
    mediaData,
    remove,
    launch,
    launchCamera,
    launchGallery,
  };
}

export default useMedia;

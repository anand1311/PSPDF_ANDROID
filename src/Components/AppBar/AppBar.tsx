import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';
import scaler from 'src/Utils/scaler';
import Block from '../Block/Block';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';

type AppBarProps = {
  left?: any;
  leftCustom?: any;
  back?: boolean;
  right?: any;
  rightCustom?: any;
  title?: string;
  titleCustom?: any;
  variant?: VARIANT;
  elevation?: number;
};

function AppBar(props: AppBarProps) {
  const {
    left,
    right,
    back,
    title,
    leftCustom,
    rightCustom,
    titleCustom,
    variant = 'primary',
    elevation = 5,
  } = props;
  const navigation = useNavigation();

  return (
    <Block
      flexDirection={'row'}
      elevation={elevation}
      height={scaler(60)}
      variant={variant}>
      {leftCustom ? (
        leftCustom
      ) : (
        <Block alignItems={'center'} justifyContent={'center'} flex={1}>
          {back ? (
            <IconButton
              iconVariant={'white'}
              name={'arrow-left'}
              onPress={navigation.goBack}
            />
          ) : (
            left
          )}
        </Block>
      )}
      {titleCustom ? (
        titleCustom
      ) : (
        <Block flex={6} justifyContent={'center'} alignItems={'center'}>
          <Typography variant={'white'} type="medium" fontSize={scaler(24)}>
            {title}
          </Typography>
        </Block>
      )}
      {rightCustom ? (
        rightCustom
      ) : (
        <Block alignItems={'center'} justifyContent={'center'} flex={1}>
          {right}
        </Block>
      )}
    </Block>
  );
}

export default AppBar;

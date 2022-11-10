import React, {Fragment} from 'react';
import {MaterialIndicator} from 'react-native-indicators';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import scaler from 'src/Utils/scaler';
import Block from '../Block/Block';
import IconButton from '../IconButton/IconButton';
import Touch, {TouchProps} from '../Touch/Touch';
import Typography, {TypographyProps} from '../Typography/Typography';

type ButtonProps = {
  left?: any;
  right?: any;
  children: any;
  height?: number;
  labelProps?: TypographyProps;
  rounded?: boolean;
  loading?: boolean;
  rightArrow?: boolean;
  type?: 'outlined' | 'filled' | 'text';
};

function Button(props: TouchProps & ButtonProps) {
  const {
    children,
    height = scaler(58),
    borderWidth = 2,
    variant = 'primary',
    labelProps,
    rounded,
    rightArrow,
    left = rightArrow ? <Block flex={1} /> : <Fragment />,
    right = rightArrow ? (
      <Block flex={1}>
        <IconButton
          elevation={1}
          name="arrow-right"
          iconVariant="white"
          backgroundColor={'#46CFBE'}
        />
      </Block>
    ) : (
      <Fragment />
    ),
    loading,
    disabled,
    borderRadius = scaler(15),
    type = 'filled',
    elevation = type === 'text' ? 0 : 5,
    borderColor,
    ...touchProps
  } = props;
  const buttonHeight = height - 2 * borderWidth;
  const fontSize = height / 3.5;
  const theme = useThemeValue();

  return (
    <Touch
      height={buttonHeight}
      opacity={disabled ? 0.5 : 1}
      variant={
        type === 'text'
          ? 'transparent'
          : disabled
          ? type === 'outlined'
            ? 'surface'
            : 'primary'
          : type === 'outlined'
          ? 'surface'
          : variant
      }
      borderRadius={rounded ? height / 2 : borderRadius}
      borderWidth={borderWidth}
      borderColor={
        type === 'text'
          ? 'transparent'
          : disabled
          ? theme.colors.primary
          : borderColor
          ? borderColor
          : variant
          ? theme.colors[variant]
          : touchProps.backgroundColor
      }
      disabled={disabled}
      elevation={elevation}
      {...touchProps}>
      <Block
        flexDirection={'row'}
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}>
        {left}
        <Block flex={4} justifyContent={'center'} flexDirection={'row'}>
          <Typography
            numberOfLines={1}
            fontSize={fontSize}
            type={'medium'}
            variant={type === 'text' ? variant : 'white'}
            {...labelProps}>
            {children}
          </Typography>
          {loading && (
            <Block marginHorizontal={fontSize}>
              <MaterialIndicator
                size={fontSize}
                color={theme.colors[labelProps?.variant ?? 'white']}
              />
            </Block>
          )}
        </Block>
        {right}
      </Block>
    </Touch>
  );
}

export default Button;

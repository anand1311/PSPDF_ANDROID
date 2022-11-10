import React, {forwardRef, useMemo} from 'react';
import {Platform, SafeAreaView, View, ViewProps, ViewStyle} from 'react-native';
import useThemeValue, {
  getVariantValue,
} from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import {VARIANT} from 'src/Modules/ThemeModule/Types/CommonTypes';

type SafeAreaBlockProps = {
  children?: any;
  variant?: VARIANT;
};

function SafeAreaBlock(
  props: SafeAreaBlockProps & ViewProps & ViewStyle,
  ref: React.LegacyRef<View> | undefined,
) {
  const {
    children,
    elevation = 0,
    style,
    onLayout,
    pointerEvents,
    testID,
    variant,
    backgroundColor,
    ...styleProps
  } = props;
  const theme = useThemeValue();
  const iosShadowElevation = useMemo(
    () =>
      elevation === 0
        ? {}
        : {
            shadowOpacity: 0.0015 * elevation + 0.18,
            shadowRadius: 0.54 * elevation,
            shadowOffset: {
              height: 0.6 * elevation,
              width: 0.6 * elevation,
            },
            shadowColor: getVariantValue('onSurface'),
          },
    [elevation],
  );

  return (
    <SafeAreaView
      ref={ref}
      testID={testID}
      onLayout={onLayout}
      pointerEvents={pointerEvents}
      style={[
        styleProps,
        Platform.OS === 'ios' ? {...iosShadowElevation} : {elevation},
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : variant
            ? theme.colors[variant]
            : theme.colors.transparent,
        },
        style,
      ]}>
      {children}
    </SafeAreaView>
  );
}

export default forwardRef(SafeAreaBlock);

import React, {Fragment} from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import CountryPicker from 'react-native-country-picker-modal';
import {MaterialIndicator} from 'react-native-indicators';
import useCountryCode from 'src/Hooks/useCountryCode';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import scaler from 'src/Utils/scaler';

type CallingCodeProps = {
  name: string;
  label?: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  control?: Control<any>;
  callback?: () => void;
};

function CallingCode({name, rules, control, callback}: CallingCodeProps) {
  const {field} = useController({
    name,
    rules,
    control,
  });
  const {onSelect, countryCode} = useCountryCode(field);
  const theme = useThemeValue();

  return (
    <Fragment>
      {countryCode ? (
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withCallingCodeButton
          onSelect={country => {
            onSelect(country);
            if (callback) {
              setTimeout(() => {
                callback();
              }, 150);
            }
          }}
          excludeCountries={['AQ', 'TF', 'HM', 'BV']}
          withFilter
          theme={{
            fontSize: scaler(15),
            ...theme.fonts.bold,
            onBackgroundTextColor: theme.colors.text,
          }}
        />
      ) : (
        <MaterialIndicator size={scaler(15)} />
      )}
    </Fragment>
  );
}

export default CallingCode;

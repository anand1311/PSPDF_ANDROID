import React, {Fragment, useState} from 'react';
import scaler from 'src/Utils/scaler';
import Timer from '../Timer/Timer';
import Typography from '../Typography/Typography';

function OtpTimer(props: {
  timerStartMessage?: string;
  timerStopMessage?: string;
  onPress: () => Promise<any>;
  loading: boolean;
}) {
  const {
    timerStartMessage = 'Re-send code in ',
    timerStopMessage = 'Resend Code',
    onPress,
    loading,
  } = props;
  const [timerStarted, setTimerStarted] = useState(true);

  return (
    <Fragment>
      {timerStarted ? (
        <Typography textAlign="center" fontSize={scaler(16)}>
          {timerStartMessage}
          <Typography fontSize={scaler(15)} variant="primary" type="medium">
            <Timer
              key={timerStarted ? 1 : 0}
              durationSeconds={30}
              onTimerStart={() => {
                setTimerStarted(true);
              }}
              onTimerEnd={() => {
                setTimerStarted(false);
              }}
            />
          </Typography>
        </Typography>
      ) : (
        <Typography
          fontSize={scaler(15)}
          textAlign="center"
          opacity={loading ? 0.5 : 1}
          variant="primary"
          textDecorationLine={'underline'}
          type="medium"
          onPress={async () => {
            try {
              await onPress();
              setTimerStarted(true);
            } catch (error) {}
          }}>
          {timerStopMessage}
        </Typography>
      )}
    </Fragment>
  );
}

export default OtpTimer;

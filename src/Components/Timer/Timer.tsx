import React, {Fragment} from 'react';
import useBackgroundTimer from 'src/Hooks/useBackgroundTimer';

function Timer(props: {
  durationSeconds: number;
  onTimerStart: () => void;
  onTimerEnd: () => void;
}) {
  const {durationSeconds, onTimerStart, onTimerEnd} = props;
  const {formattedSeconds} = useBackgroundTimer(
    durationSeconds,
    onTimerStart,
    onTimerEnd,
  );

  return <Fragment>{formattedSeconds}</Fragment>;
}

export default Timer;

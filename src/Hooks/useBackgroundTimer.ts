import {useEffect, useRef, useState} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {addZero} from 'src/Utils/Helpers';

function useBackgroundTimer(
  durationSeconds: number,
  onTimerStart?: () => void,
  onTimerEnd?: () => void,
) {
  const [seconds, setSeconds] = useState(durationSeconds - 1);
  const onTimerStartRef = useRef(onTimerStart);
  const onTimerEndRef = useRef(onTimerEnd);

  useEffect(() => {
    const timeout = BackgroundTimer.setTimeout(() => {
      BackgroundTimer.stopBackgroundTimer();
      onTimerEndRef.current?.();
    }, durationSeconds * 1000);

    return () => {
      BackgroundTimer.clearTimeout(timeout);
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [durationSeconds]);

  useEffect(() => {
    onTimerStartRef.current?.();
    const interval = BackgroundTimer.setInterval(() => {
      setSeconds(_seconds => (_seconds === 0 ? 0 : _seconds - 1));
    }, 1000);

    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  }, []);

  return {
    seconds,
    formattedSeconds: `${addZero(Math.floor(seconds / 60))}:${addZero(
      seconds % 60,
    )}`,
  };
}

export default useBackgroundTimer;

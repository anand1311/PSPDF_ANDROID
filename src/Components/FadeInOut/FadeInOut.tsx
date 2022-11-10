import {AnimatePresence, MotiView} from 'moti';
import React, {ReactNode} from 'react';

const VIEW_STYLE = {flex: 1};

function FadeInOut(props: {children: ReactNode}) {
  const {children} = props;

  return (
    <AnimatePresence>
      <MotiView
        from={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        style={VIEW_STYLE}>
        {children}
      </MotiView>
    </AnimatePresence>
  );
}

export default FadeInOut;

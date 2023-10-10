import {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './plotTooltip.module.css';

const PlotTooltip: FC<{ children?: ReactNode }> = ({ children }) => {
  const [coords, setCoords] = useState([0, undefined, 0, undefined]);

  const processMouseEvent = useCallback((event: MouseEvent) => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    let coords: (number | undefined)[] = [
      undefined,
      undefined,
      undefined,
      undefined,
    ];
    if (event.clientX + 150 < screenWidth) {
      coords[0] = event.pageX + 15;
    } else {
      coords[1] = screenWidth - event.pageX + 15;
    }
    coords[3] = screenHeight - event.pageY;
    coords[2] = screenHeight - event.pageY;
    // if (event.clientY - 100 > 0) {
    //   coords[3] = screenHeight - event.pageY;
    // } else {
    //   coords[2] = event.pageY - 40;
    // }
    setCoords(coords);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', processMouseEvent);
    return () => {
      window.removeEventListener('mousemove', processMouseEvent);
    };
  }, [processMouseEvent]);
  return (
    <div
      className={styles.wrapper}
      style={{
        display: children === undefined ? 'none' : 'block',
        left: coords[0],
        right: coords[1],
        top: coords[2],
        bottom: coords[3],
      }}
    >
      {children}
    </div>
  );
};

export default memo(PlotTooltip);

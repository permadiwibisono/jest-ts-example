import {useRef} from "react";
import styles from "./auto-scaling-text.module.css";

function getScale(node: any) {
  if (!node) {
    return 1;
  }
  const parentNode = node.parentNode;

  const availableWidth = parentNode.offsetWidth;
  const actualWidth = node.offsetWidth;
  const actualScale = availableWidth / actualWidth;

  if (actualScale < 1) {
    return actualScale * 0.9;
  }
  return 1;
}

function AutoScalingText({children}: {children?: React.ReactNode}) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const scale = getScale(nodeRef.current);
  return (
    <div
      className={styles.autoScalingText}
      style={{transform: `scale(${scale},${scale})`}}
      ref={nodeRef}
      data-testid="total"
    >
      {children}
    </div>
  );
}

export default AutoScalingText;

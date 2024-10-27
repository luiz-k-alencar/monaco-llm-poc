/** react */
import { FC, ReactNode } from "react";

/** styles */
import styles from "./styles.module.scss";
////////////////////////////////////////////////////////////////////////////////

interface Props {
  children: ReactNode;
}

const Backdrop: FC<Props> = ({ children }) => {
  return (
    <div
      className={styles.backdrop}
    >
      {children}
    </div>
  );
};

export default Backdrop;
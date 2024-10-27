/** external libs */
import { TailSpin } from "react-loader-spinner";

/** components */
import Backdrop from "./backdrop";
////////////////////////////////////////////////////////////////////////////////

const Spinner = () => {
  return (
    <Backdrop>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="var(--neutral-200)"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Backdrop>
  );
};

export default Spinner;

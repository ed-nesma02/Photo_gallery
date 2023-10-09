import {TailSpin} from 'react-loader-spinner';

export const TailSpinLoader = () => (
  <TailSpin
    height="80"
    width="80"
    color="#000"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{margin: 'auto'}}
    visible={true}
  />
);

import { HashLoader } from 'react-spinners';

const Loader = ({loading,color}) => {
  if(!loading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <HashLoader loading={loading} color={color?color:"#ffffff"} />
    </div>
  );
};

export default Loader;

import { toast } from "react-toastify";

export const showToast = (msg, status = "success", position = "bottom-left") => {
  const customToast = ({ closeToast }) => (
    <div className={`text-xs ${status === 'success' ? 'text-[#2E7D32]' :'text-[#C62828]'}  flex justify-between items-center w-full`}>
      {msg}
      <button
        onClick={closeToast}
        className={`ml-4 ${status === 'success' ? 'text-[#2E7D32]' :'text-[#C62828]'} hover:text-[black] hover:btn-circle hover:cursor-pointer text-sm  btn-ghost`}
      >
        ✕
      </button>
    </div>
  );

  toast[status.toLocaleLowerCase()](customToast, {
    position: position,
    hideProgressBar: true,
    autoClose: 2000,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    icon: false,
    closeButton: false,
    style: {
      backgroundColor : status === 'success' ? '#F3FFF5' :'#FFF5F3'
    }
  });
};

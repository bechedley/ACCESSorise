import React from 'react';

const Modal = props => (
    <div className='transition ease-in-out container modal shadow w-2/5 min-h-36 bg-white fixed top-32 inset-x-1/3 bottom-10 rounded z-20 p-5 overscroll-y-auto w-full max-h-full overflow-x-hidden justify-center'>
        <header className='relative flex flex-shrink-0 font-satisfy text-5xl text-mauve text-center modal-header p-3 float-center'>{props.title}</header>
        <div className='modal-content p-3 mb-5 flex flex-auto relative justify-center items-center overflow-y-auto'>{props.children}</div>
        <div className='modal-actions flex flex-shrink-0 flex-wrap justify-end'>
        {props.canCancel && <button type="submit" className="p-2 mx-1 px-4 bg-grey rounded-md font-satisfy text-center text-slate text-3xl" onClick={props.onCancel}>Cancel</button>}
        {props.canConfirm && <button type="submit" className="p-2 px-4 bg-blue rounded-md font-satisfy text-center text-slate text-3xl" onClick={props.onConfirm}>{props.btnText}</button>}
        </div>
    </div>
);

export default Modal;
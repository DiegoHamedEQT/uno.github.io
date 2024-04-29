import React, { useState } from 'react';
import ModalLoadForm from './LoadForm';
import './Modal.css';
import ModalSaveForm from './SaveForm';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    let modalContent, title;
    if(window.location.pathname==="/"){
        title="XMLs salvos"
        modalContent = <ModalLoadForm />
    } else {
        title="Salvar formulário"
        modalContent = <ModalSaveForm />
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button 
                class="bg-[#bc10a8] hover:bg-[#800f72] focus:ring rounded-full font-semibold text-white px-5 py-2" 
                onClick={openModal}
            >
                {title}
            </button>
            {isOpen && (
                <>
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 class="text-x1 font-semibold text-gray-900">{title}</h3>
                    </div>

                    <div class="modal-overlay bg-green">
                        <div class="modal bg-white border-4 border-solid border-white top-0 right-0 left-0 z-50 items-center w-96 md:inset-0 h-56">
                            <div class="modal-content bg-yellow  shadow-md h-full">
                                <div class="flex justify-end">
                                    <button class="bg-[#f53b0c] focus:ring font-semibold text-white px-5 py-2" onClick={closeModal}>X</button>
                                </div>
                                {modalContent}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Modal;
import React from "react";
import axios from "axios";
import ReactModal from 'react-modal';
import CustomButton from "../CustomButton/CustomButton";

class Modal extends React.Component{
    constructor () {
        super();
        this.state = {
            showModal: true
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div>
                {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
                {/*<CustomButton props={this.handleOpenModal} />*/}
                <ReactModal isOpen={this.state.showModal}>
                    <CustomButton onClick={this.handleCloseModal}>Проголосовать</CustomButton>
                    <CustomButton onClick={this.handleCloseModal}>Отмена</CustomButton>
                </ReactModal>
            </div>
        );
    }
}
export default Modal;

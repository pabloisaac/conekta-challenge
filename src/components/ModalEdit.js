import React, { useContext } from "react";
import { AppContext } from "../store/reducer";
import { getListRecords} from "../services/ApiConekta";
import Modal from '@material-ui/core/Modal';
import Paper from "@material-ui/core/Paper";
import Form from './Form';
import { setModalVisible, updateListItems, setMode } from "../store/actions";
import './index.css';
import _ from "lodash";


const ModalEdit = () => {
    const { state, dispatch } = useContext(AppContext);

    const handleClose = async () => {
        const response = await getListRecords(sessionStorage.getItem('token'));
        if (_.has(response, "status") && response.status === 200) {
          dispatch(updateListItems(response.data))
        }
        dispatch(setModalVisible(false))
        dispatch(setMode('SAVE'))
    }

    return (
        <>
            <Modal
                open={state.modalVisible}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="modal-css"
            >
                <Paper elevation={3} className="paper-css">
                    <Form/>
                </Paper>
            </Modal>
        </>
    );
}

export default ModalEdit;
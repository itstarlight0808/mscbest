import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doBookingAPI } from "../store/slices/classSlice";

const BookDialog = ({ isOpen, setIsOpen, selClass }) => {
    const dispatch = useDispatch();

    const [selected, setSelected] = useState(0);

    const doBooking = () => {
        dispatch(doBookingAPI({ classId: selClass.id, groupId: selClass.groups[selected].id }));
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="c-book-dialog-container">
            <DialogTitle>Book Class</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please select your appropriate group and price!
                </DialogContentText>
                <div className="group-container">
                    {
                        selClass.groups?.map((group, index) => (
                            <div key={`group_`+index} className="mt-2">
                                <label className="d-block">{`Price ${index + 1}`}</label>
                                <div className={`group-item mt-2 ${selected === index? "active": ""}`} onClick={() => setSelected(index)}>
                                    <span className="group-name">{ group.name }</span>
                                    <span className="group-price">{ group.price }€</span>
                                    { selected === index && <FontAwesomeIcon icon="fas fa-check" /> }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => doBooking()} variant="contained" color="primary">
                    Save
                </Button>
                <Button onClick={() => setIsOpen(false)} variant="contained" color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BookDialog;
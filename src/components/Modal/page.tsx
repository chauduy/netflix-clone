"use client";
import React from "react";
import { Modal as MUIModal } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";

function Modal() {
    const openModal = useAppSelector((state) => state.modal.open);

    return (
        <MUIModal open={openModal}>
            <>Modal</>
        </MUIModal>
    );
}

export default Modal;

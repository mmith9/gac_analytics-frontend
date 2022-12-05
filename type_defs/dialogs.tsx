import { DatacronCC } from "./data_classes";

export interface AddUnitDialogProps
{
    open: boolean;
    selectedValue: string;
    onClose: Function;
    side: string;
}

export const addUnitDialogProps_init: AddUnitDialogProps = {
    open: false, selectedValue: '', onClose: () => { }, side: '',
}

export interface DatacronDialogProps
{
    open: boolean;
    onClose: Function;
    side: string;
}

export const datacronDialogProps_init: DatacronDialogProps = {
    open: false, onClose: () => { }, side: '',
}

export interface TeamDialogProps
{
    open: boolean;
    onClose: Function;
    side: string;
}

export const TeamDialogProps_init: TeamDialogProps = {
    open: false, onClose: () => { }, side: '',
}



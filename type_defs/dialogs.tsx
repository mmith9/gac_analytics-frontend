import { DatacronCC } from "./data_classes";

export interface UnitDialogProps
{
    open: boolean;
    selectedValue: string;
    onClose: Function;
    side: string;
}

export const unitDialogProps_init: UnitDialogProps = {
    open: false, selectedValue: '', onClose: () => { }, side: '',
}

export interface DatacronDialogProps
{
    open: boolean;
    selectedValue: DatacronCC;
    onClose: Function;
    side: string;
}

export const datacronDialogProps_init: DatacronDialogProps = {
    open: false, selectedValue: {}, onClose: () => { }, side: '',
}


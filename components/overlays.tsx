import * as React from 'react';
import { useAppData } from '../contexts/app_data_context_provider'
import DatacronDialog from './dialog_datacron_props';
import UnitDialog from './dialog_add_unit'

const Overlays=()=>{
    const {datacronDialogProps,unitDialogProps, setAppData} = useAppData()
    return (
        <>
            <UnitDialog 
                open={unitDialogProps.open} 
                onClose={unitDialogProps.onClose} 
                selectedValue={unitDialogProps.selectedValue}
                side={unitDialogProps.side}
            />
            <DatacronDialog
                open={datacronDialogProps.open}
                onClose={datacronDialogProps.onClose}
                selectedValue={datacronDialogProps.selectedValue}
                side={datacronDialogProps.side}
            />

        </>
    )
}
export default Overlays


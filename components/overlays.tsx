import * as React from 'react';
import { useAppData } from '../contexts/app_data_context_provider'
import DatacronDialog from './datacron_dialog';
import UnitDialog from './unit_dialog'

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


import * as React from 'react';
import { useAppData } from '../contexts/app_data_context_provider'
import UnitDialog from './unit_dialog'

const Overlays=()=>{
    const {unitDialogProps, setAppData} = useAppData()
    return (
        <UnitDialog 
            open={unitDialogProps.open} 
            onClose={unitDialogProps.onClose} 
            selectedValue={unitDialogProps.selectedValue}
            side={unitDialogProps.side}
        />
    )
}
export default Overlays


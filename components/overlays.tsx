import * as React from 'react';
import { useAppData } from '../contexts/app_data_context_provider'
import DatacronDialog from './dialog_datacron_props';
import AddUnitDialog from './dialog_add_unit'
import TeamDialog from './dialog_team';

const Overlays=()=>{
    const {datacronDialogProps,unitDialogProps, teamDialogProps, setAppData} = useAppData()
    return (
        <>
            <AddUnitDialog 
                open={unitDialogProps.open} 
                onClose={unitDialogProps.onClose} 
 
                side={unitDialogProps.side}
            />
            <DatacronDialog
                open={datacronDialogProps.open}
                onClose={datacronDialogProps.onClose}

                side={datacronDialogProps.side}
            />
            <TeamDialog
                open={teamDialogProps.open}
                onClose={teamDialogProps.onClose}

                side={teamDialogProps.side}
            />

        </>
    )
}
export default Overlays


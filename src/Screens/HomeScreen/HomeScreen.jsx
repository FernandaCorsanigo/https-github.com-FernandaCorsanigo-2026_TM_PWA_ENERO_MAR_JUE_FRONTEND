import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'

const HomeScreen = () => {
    const {workspace_list_loading, workspace_list, workspace_list_error} = useContext(WorkspaceContext)
    console.log(workspace_list)
    if (workspace_list_loading || !workspace_list){
        return <span>Cargando...</span>
    } 
    return (
        <div>
            <h1>Bienvenido nuevamente</h1>

            {workspace_list_error && <span>{workspace_list_error.message}</span>}
            {workspace_list.data.workspaces && workspace_list.data.workspaces.length > 0 && workspace_list.data.workspaces.map(workspace => <p key={workspace.workspace_id}>{workspace.workspace_title}</p>)}
            {workspace_list.data.workspaces && workspace_list.data.workspaces.length === 0 && <span>No hay espacios de trabajo</span>}
        </div>
    )
}

export default HomeScreen
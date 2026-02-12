import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import AuthContextProvider from './Context/AuthContext'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import WorkspaceContextProvider from './Context/WorkspaceContext'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'
import ChannelScreen from './Screens/ChannelScreen/ChannelScreen'
import EmailVerificationScreen from './Screens/EmailVerificationScreen/EmailVerificationScreen'
function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path='/verify-email' element={<EmailVerificationScreen />} />
        <Route element={<AuthMiddleware />}> /*Aca el middleware protege a la ruta de home y solo deja 'pasar' si esta logeado */
          <Route path='/home' element={
            <WorkspaceContextProvider>
              <HomeScreen />
            </WorkspaceContextProvider>
          } />
          <Route path='/create-workspace' element={<CreateWorkspaceScreen />} />
          <Route path='//workspace/:workspace_id/channels' element={<ChannelScreen />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App

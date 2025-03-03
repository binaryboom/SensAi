import React from 'react'
import { Button } from './components/ui/button'
import 'regenerator-runtime/runtime'
import Home from './components/ui/home'
import Header from './components/ui/header'
import Footer from './components/ui/footer'
import { ThemeProvider } from './components/theme-providers'
import { Route, Routes } from 'react-router'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import InterviewModes from './components/ui/InterviewModes'
import ResumeInsight from './components/interview/ResumeInsight'
import CodeMastery from './components/interview/CodeMastery'
import HandsOn from './components/interview/HandsOn'
import CultureFit from './components/interview/CultureFit'
import CompatibilityCheck from './components/interview/CompatibilityCheck'
import Compat2 from './components/interview/compat2'
import Interview from './components/interview/Interview'
import CodingPlayground from './components/interview/CodingPlayground'
import Stt from './components/utils/stt'
import Thanks from './components/interview/thanks'


const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid-background" />  {/* for grid background with blur */}
     

      <Header />
      <main className='min-h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/interview-modes' element={<InterviewModes />} />
          <Route path='/modes/resume-insight' element={<ResumeInsight />} />
          <Route path='/modes/code-mastery' element={<CodeMastery />} />
          <Route path='/modes/hands-on' element={<HandsOn />} />
          <Route path='/modes/culture-fit' element={<CultureFit />} />
          <Route path='/modes/compatibility-check' element={<CompatibilityCheck />} />
          <Route path='/modes/c2' element={<Compat2 />} />
          <Route path='/interview' element={<Interview />} />
          <Route path='/thank-you' element={<Thanks />} />
          <Route path='/code' element={<CodingPlayground />} />
          <Route path='/stt' element={<Stt />} />
          
        </Routes>
      </main>
      <Footer/>
    </ThemeProvider>
  )
}

export default App

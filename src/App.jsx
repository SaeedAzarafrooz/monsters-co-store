import Footer from "./Components/sections/Footer"
import Header from "./Components/sections/Header"
import Main from "./Components/sections/Main"


function App() {

  return (
    <>
     <div id="top" className='flex flex-col  bg-slate-800'>
      <Header/>
      <div className="flex justify-center w-full h-full z-10">
        <Main/>
      </div>
      <Footer/>
     </div>
    </>
  )
}

export default App

import Footer from "./Components/sections/Footer"
import Header from "./Components/sections/Header"
import Main from "./Components/sections/Main"
import SideBar from "./Components/sections/SideBar"
import Test from "./Components/sections/test"
import arrow from "./assets/ArrowUp.png"

function App() {

  return (
    <>
     <div id="top" className='flex flex-col  bg-slate-800'>
      <Header/>
      <div className="flex justify-center w-full h-full z-10">
        {/* <SideBar/> */}
        <Main/>
        {/* <a className="fixed right-6 bottom-12 z-10 bg-slate-100 px-2 py-2 rounded-full" href="#top"><img className="h-8" src={arrow} alt="" /></a> */}
      </div>
      <Footer/>
     </div>
    </>
  )
}

export default App

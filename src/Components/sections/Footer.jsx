import image1 from "../../assets/FooterImage1.png"
import image2 from "../../assets/FooterImage2.png"
import name from "../../assets/name.png"
import mobile from "../../assets/mobile.png"
import telegram from "../../assets/telegram.png"
import email from "../../assets/email.png"
import linkedin from "../../assets/linkedin.png"


function Footer() {
    return (
        <div className="relative flex flex-col items-start justify-start py-4 bg-slate-900 overflow-hidden min-h-48 text-white md:flex-row md:items-start md:justify-center md:py-4 ">
            <img className="absolute -right-10 -top-7 h-36 sm:h-52 md:h-44 md:top-3 md:right-0 lg:-right-10 xl:right-0" src={image1} alt="" />
            <div className="z-10 h-full mb-4 pb-4 mt-16 sm:mt-0 sm:pr-24  ml-4 pl-1 w-[80%] md:pr-2 md:ml-10 md:w-1/3  lg:w-1/4">
                <p className="font-bold text-2xl">About me.</p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum nesciunt dicta nobis praesentium blanditiis,
                 minima, perferendi Ipsum nesciunt dicta nobis praesentium blanditiis, minima, perferendi
            </div>

           <div className="flex flex-col justify-center items-start ml-12 sm:ml-24 w-2/3 sm:flex-row md:flex-col md:ml-4 md:w-1/3 md:border-l lg:w-1/2 lg:flex-row"> 
            <div className="z-10 mb-4 pb-4 flex flex-col w-1/2 h-full px-6 md:pb-1 ">
                <p className="font-bold text-2xl">Links.</p>
                <div className="flex gap-1"><p>API: </p><a href="https://rickandmortyapi.com/documentation/">rickandmortyapi</a></div>
                <div className="flex gap-1"><p>Boilerplate: </p><a href="https://vite.dev/guide/">Vite</a></div>
                <div className="flex gap-1"><p className="whitespace-nowrap">UI Library: </p><a href="https://tailwindcss.com/docs/guides/vite">Tailwindcss</a></div>
            </div>

            <div className="flex flex-col items-start justify-center gap-1 z-10 w-1/2 px-6 lg:border-l">
                <p className="font-bold text-2xl whitespace-nowrap">Contact info.</p>
                <div className="flex justify-start items-center gap-1"><img className="h-4" src={name} alt="name-icon" /> <p className="whitespace-nowrap">Saeed Azarafrooz</p></div>
                <div className="flex justify-start items-center gap-1"><img className="h-4" src={email} alt="email-icon" /> <p> sazarafrooz@gmail.com</p></div>
                <div className="flex justify-start items-center gap-1"><img className="h-4" src={mobile} alt="mobile-icon" /> <p> 09128483270</p></div>
                <div className="flex justify-start items-center gap-1"><img className="h-4" src={telegram} alt="telegram-icon" /> <p> @SaeedAzarafrooz</p></div>
                <div className="flex justify-start items-center gap-1"><img className="h-4" src={linkedin} alt="linkedin-icon" />
                    <a className="whitespace-nowrap" 
                    href="https://www.linkedin.com/in/saeed-azarafrooz-92a52a268/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_verification_details%3B%2BV73m4CSSa6%2FrO37RJ1irQ%3D%3D">Saeed Azarafrooz</a>
                </div>
            </div>
            </div>
            <img className="absolute -left-5 top-[370px] sm:top-44 h-36 sm:h-48 md:top-8 " src={image2} alt="" />
        </div>
    )
}

export default Footer
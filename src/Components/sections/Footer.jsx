import React from 'react';
import image1 from "../../assets/FooterImage1.png";
import image2 from "../../assets/FooterImage2.png";
import name from "../../assets/name.png";
import mobile from "../../assets/mobile.png";
import telegram from "../../assets/telegram.png";
import email from "../../assets/email.png";
import linkedin from "../../assets/linkedin.png";

function Footer() {
  return (
    <footer className="relative flex flex-col items-start justify-start py-8 bg-app-card border-t border-app-border overflow-hidden min-h-48 text-app-text md:flex-row md:items-start md:justify-center transition-colors duration-200">
      {/* Decorative Image 1 */}
      <img
        className="absolute -right-10 -top-7 h-36 sm:h-52 md:h-44 md:top-3 md:right-0 lg:-right-10 xl:right-0 opacity-80 pointer-events-none select-none"
        src={image1}
        alt=""
      />

      {/* About Section */}
      <div className="z-10 h-full mb-6 pb-4 mt-16 sm:mt-0 sm:pr-20 ml-6 pl-1 w-[85%] md:pr-4 md:ml-10 md:w-1/3 lg:w-1/4">
        <p className="font-bold text-2xl text-app-text mb-3">About me.</p>
        <p className="text-sm leading-relaxed text-app-text-muted">
          A frontend enthusiast passionate about crafting responsive, accessible, and performant web interfaces with clean design systems.
        </p>
      </div>

      {/* Links & Contacts Container */}
      <div className="flex flex-col justify-center items-start ml-6 sm:ml-20 w-5/6 sm:flex-row md:flex-col md:ml-4 md:w-1/3 md:border-l md:border-app-border lg:w-1/2 lg:flex-row">
        
        {/* Useful Links */}
        <div className="z-10 mb-6 pb-2 flex flex-col w-full sm:w-1/2 h-full px-4 md:pb-1 text-sm">
          <p className="font-bold text-2xl text-app-text mb-3">Links.</p>
          <div className="flex gap-2 py-1 items-center">
            <span className="text-app-text-muted">API:</span>
            <a
              href="https://rickandmortyapi.com/documentation/"
              target="_blank"
              rel="noreferrer"
              className="text-app-accent hover:underline"
            >
              rickandmortyapi
            </a>
          </div>
          <div className="flex gap-2 py-1 items-center">
            <span className="text-app-text-muted">Boilerplate:</span>
            <a
              href="https://vite.dev/guide/"
              target="_blank"
              rel="noreferrer"
              className="text-app-accent hover:underline"
            >
              Vite
            </a>
          </div>
          <div className="flex gap-2 py-1 items-center">
            <span className="text-app-text-muted whitespace-nowrap">UI Library:</span>
            <a
              href="https://tailwindcss.com/docs/guides/vite"
              target="_blank"
              rel="noreferrer"
              className="text-app-accent hover:underline"
            >
              Tailwindcss
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start justify-center gap-2 z-10 w-full sm:w-1/2 px-4 lg:border-l lg:border-app-border text-sm">
          <p className="font-bold text-2xl text-app-text mb-2 whitespace-nowrap">Contact info.</p>
          
          <div className="flex justify-start items-center gap-2">
            <img className="h-4 w-4 object-contain opacity-80" src={name} alt="name-icon" />
            <span className="whitespace-nowrap text-app-text-muted">Saeed Azarafrooz</span>
          </div>

          <div className="flex justify-start items-center gap-2">
            <img className="h-4 w-4 object-contain opacity-80" src={email} alt="email-icon" />
            <a href="mailto:sazarafrooz@gmail.com" className="text-app-text-muted hover:text-app-accent transition-colors">
              sazarafrooz@gmail.com
            </a>
          </div>

          <div className="flex justify-start items-center gap-2">
            <img className="h-4 w-4 object-contain opacity-80" src={mobile} alt="mobile-icon" />
            <span className="text-app-text-muted">09128483270</span>
          </div>

          <div className="flex justify-start items-center gap-2">
            <img className="h-4 w-4 object-contain opacity-80" src={telegram} alt="telegram-icon" />
            <a
              href="https://t.me/SaeedAzarafrooz"
              target="_blank"
              rel="noreferrer"
              className="text-app-text-muted hover:text-app-accent transition-colors"
            >
              @SaeedAzarafrooz
            </a>
          </div>

          <div className="flex justify-start items-center gap-2">
            <img className="h-4 w-4 object-contain opacity-80" src={linkedin} alt="linkedin-icon" />
            <a
              className="whitespace-nowrap text-app-text-muted hover:text-app-accent transition-colors"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/saeed-azarafrooz-92a52a268/"
            >
              Saeed Azarafrooz
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Image 2 */}
      <img
        className="absolute -left-5 top-[370px] sm:top-44 h-36 sm:h-48 md:top-8 opacity-80 pointer-events-none select-none"
        src={image2}
        alt=""
      />
    </footer>
  );
}

export default Footer;

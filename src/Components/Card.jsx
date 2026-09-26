import { useState } from "react";
import desc from "../assets/desc.png";

// Skeleton matching the exact dimensions and layout of the real Card
export function CardSkeleton() {
  return (
    <div className="flex flex-col bg-slate-200 w-60 h-96 rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder flush with top edges */}
      <div className="w-full h-60 bg-slate-300 shrink-0" />

      {/* Title & ID placeholder */}
      <div className="flex items-center gap-2 px-2 py-2 w-full">
        <div className="w-6 h-4 bg-slate-300 rounded" />
        <div className="w-3/4 h-4 bg-slate-300 rounded" />
      </div>

      {/* Price placeholder */}
      <div className="px-2">
        <div className="w-20 h-4 bg-slate-300 rounded" />
      </div>

      {/* Bottom meta details placeholder */}
      <div className="flex items-end text-sm mt-auto h-full p-2 gap-2">
        <div className="w-12 h-14 bg-slate-300 rounded shrink-0" />
        <div className="flex flex-col gap-1.5 w-full">
          <div className="w-3/4 h-3 bg-slate-300 rounded" />
          <div className="w-1/2 h-3 bg-slate-300 rounded" />
          <div className="w-full h-3 bg-slate-300 rounded" />
        </div>
      </div>
    </div>
  );
}

function Card({ props , onClick}) {
  const { image, name, id, episode, gender, status, species, type } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
          onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="
        flex flex-col bg-slate-200 w-60 h-96 rounded-lg cursor-pointer overflow-hidden
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/50
      "
    >
      {/* Fixed image container flush with top borders */}
      <div className="relative w-full h-60 bg-slate-300 shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-300 animate-pulse" />
        )}
        <img
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={props.image}
          alt={`${props.name}-image`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </div>

      {/* Card Header & Title */}
      <div className="flex px-2 py-1 whitespace-nowrap w-[98%] font-medium">
        {props.id} -
        <p className="text-ellipsis overflow-hidden ml-1">{props.name} Sticker</p>
      </div>

      {/* Price */}
      <div className="px-2 text-slate-700 font-semibold">
        Price: {(parseInt(props.episode.length, 10) * 0.4).toFixed(1)} $
      </div>

      {/* Card Details / Footer */}
      <div className="flex items-end text-sm mt-1 h-full">
        <img className="h-20" src={desc} alt="description-image" />
        <div className="flex flex-wrap justify-start items-center h-full gap-x-1 pl-1 pb-1">
          <div>gender:{props.gender} |</div>
          <div className="flex gap-1">
            status:{" "}
            {props.status === "Dead" ? (
              <p className="bg-red-500 text-white w-fit px-1 pb-[2px] rounded-md font-semibold">
                {props.status}
              </p>
            ) : props.status === "Alive" ? (
              <p className="bg-green-500 text-white w-fit px-1 pb-[2px] rounded-md font-semibold">
                {props.status}
              </p>
            ) : (
              <p className="bg-yellow-500 text-black w-fit px-1 pb-[2px] rounded-md font-semibold">
                {props.status}
              </p>
            )}
          </div>
          <div className="flex gap-1">
            <div className="flex">
              <p>species:</p> {props.species}
            </div>
            <div className="flex whitespace-nowrap w-[40%]">
              | type:{" "}
              <p className="text-ellipsis overflow-hidden">
                {props.type !== "" ? props.type : "-"}
              </p>
            </div>
          </div>
          <div className="flex gap-[2px]">
            Episode:
            {props.episode.length > 9 ? (
              <div>more than 9</div>
            ) : (
              props.episode.map((item, index) => (
                <p
                  key={index}
                  className="bg-orange-400 rounded-md px-[2px] text-white"
                >
                  {item.split("/")[item.split("/").length - 1]}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

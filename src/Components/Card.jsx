import desc from "../assets/desc.png"

function Card({ props }) {
    return (
        <div className="flex flex-col bg-slate-200 w-60 h-96 rounded-lg cursor-pointer overflow-hidden hover:drop-shadow-md">
            <div>
                <img className="w-full " src={props.image} alt={`${props.name}-image`} />
            </div>
            <div className="flex px-2 py-1 whitespace-nowrap w-[98%]">
                {props.id} -
                <p className="text-ellipsis overflow-hidden">{props.name} Sticker</p>
            </div>
            <div className="px-2 ">Price:  {(parseInt(props.episode.length) * 0.4).toFixed(1)} $</div>
            <div className=" flex items-end text-sm mt-1 h-full ">
                <img className="h-20 " src={desc} alt="description-image" />
                <div className="flex flex-wrap justify-start items-center h-full gap-x-1 pl-1 pb-1"><div>gender:{props.gender} |</div>
                    <div className="flex gap-1">status: {props.status === "Dead" ? <p className="bg-red-500 w-fit px-1 pb-[2px] rounded-md">{props.status}</p>
                        : props.status === "Alive" ? <p className="bg-green-500 w-fit px-1 pb-[2px] rounded-md">{props.status}</p>
                            : <p className="bg-yellow-500 w-fit px-1 pb-[2px] rounded-md">{props.status}</p>}
                    </div>
                    <div className="flex gap-1">
                        <div className="flex"><p> species:</p> {props.species} </div>
                        <div className="flex whitespace-nowrap w-[40%]">| type: <p className="text-ellipsis overflow-hidden">{props.type !== "" ? props.type : "-"}</p> </div>
                    </div>
                    <div className="flex  gap-[2px]">Episode:
                        {props.episode.map((item, index) => (item)).length > 9 ? <div>more than 9 </div> : props.episode.map((item, index) => (
                            <p key={index} className="bg-orange-400 rounded-md px-[2px]">{item.split("/")[item.split("/").length - 1]}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
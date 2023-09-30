import "./details.css"

export default function Details({overlayDisplay, detailDisplay, logbook, detailDisplayHandler}){

    if(logbook){
        return(
            <div className="fixed details-container">
                <div className={`overlay absolute h-screen w-screen ${overlayDisplay} max-[850px]:hidden`} onClick={()=>detailDisplayHandler(logbook["title"], "overlay-out", "detail-out")}></div>
                <div className={`p-4 px-6 details absolute bg-white border h-screen ${detailDisplay}`}>
                    <h2 className='text-4xl font-semibold mb-10 mt-4'>{logbook["title"]}</h2>
                    <button className="absolute top-8 text-red-600 text-lg font-semibold right-5 py-1 px-4 border-2 border-red-600 rounded-full" onClick={()=>{detailDisplayHandler(logbook["title"], "overlay-out", "detail-out")}}>x</button>
                    {Object.keys(logbook).map((key, index) => {
                        if(key!='logs'){
                            const key2 = key.split("_").join(" ").toUpperCase()
                            return(
                                <div>
                                    <div className="mb-5">
                                        <span className="font-semibold">{key2}: </span>
                                        <span>{logbook[key]}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
    return (
        <></>
    )
}
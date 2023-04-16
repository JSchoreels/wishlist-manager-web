import React from "react";
import "./WishlistCard.scss";

export default function WishlistCard({data, extra}) {
    const style = {
        opacity: extra ? 0.5 : 1,
    };
    return (
        <div className={"card"} style={{...style}}>
            <div className={"name"} style={{width: "100%", backgroundColor: data.owned ? "lightgreen" : null}}>{data.name}</div>
            <div className={"category"}>{data.category}</div>
            <div className={"preview"}>
                <img src={data.picture.includes("http") ? data.picture : require(`../data/${data.picture}`)}
                     alt={`Preview image of ${data.name}`}/>
            </div>
            <div className={"footer"} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <div className={"release_date"}>{data.releaseDate ? data.releaseDate : 'No Release Date'}</div>
                <div className={"controls"}>
                    <a href={`https://google.com/search?q=${encodeURIComponent(data.name)}`} target="_blank" rel="noopener noreferrer">
                        <span role={"img"} aria-label={"Related News"}>🄽</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
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
            <div className={"controls"} style={{marginLeft: "auto"}}>
                <a href={`https://google.com/search?q=${encodeURIComponent(data.name)}`} target="_blank" rel="noopener noreferrer">
                    <span role={"img"} aria-label={"Related News"}>🄽</span>
                </a>
            </div>
        </div>
    );
}
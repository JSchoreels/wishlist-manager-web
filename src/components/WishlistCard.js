import React from "react";
import "./WishlistCard.scss";

export default function WishlistCard({data, opacity}) {
    return (
        <div className={"card"} style={{opacity: opacity}}>
            <div className={"name"}>{data.name}</div>
            <div className={"category"}>{data.category}</div>
            <div className={"preview"}>
                <img src={data.picture.includes("http") ? data.picture : require(`../data/${data.picture}`)}
                     alt={`Preview image of ${data.name}`}/>

            </div>
        </div>
    );
}
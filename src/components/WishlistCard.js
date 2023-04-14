import React from "react";
import "./WishlistCard.scss";

export default function WishlistCard({data, extra}) {
    const style = {
        opacity: extra ? 0.5 : 1,
        backgroundColor: data.owned ? "lightgreen" : null
    };
    return (
        <div className={"card"} style={{...style}}>
            <div className={"name"}>{data.name}</div>
            <div className={"category"}>{data.category}</div>
            <div className={"preview"}>
                <img src={data.picture.includes("http") ? data.picture : require(`../data/${data.picture}`)}
                     alt={`Preview image of ${data.name}`}/>

            </div>
        </div>
    );
}
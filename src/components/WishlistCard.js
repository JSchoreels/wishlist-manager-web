import React, {memo, useCallback} from "react";
import "./WishlistCard.scss";

export default memo(function WishlistCard({deleteItemCallback, data, extra}) {
    const style = {
        opacity: extra ? 0.5 : 1,
    };
    const deleteCard = useCallback(() => deleteItemCallback(data.id), [deleteItemCallback, data.id]);
    return (
        <div className={"card"} style={{...style}}>
            <div className={"name"} style={{width: "100%", backgroundColor: data.owned ? "lightgreen" : null}}>{data.name}</div>
            <div className={"category"}>{data.category}</div>
            <div className={"preview"}>
                <img src={data.picture.startsWith("http") || data.picture.startsWith("data:")? data.picture : require(`../data/${data.picture}`)}
                     alt={`Preview image of ${data.name}`}/>
            </div>
            <div className={"footer"} style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <div className={"release_date"}>{data.releaseDate ? data.releaseDate : 'No Release Date'}</div>
                <div className={"controls"} style={{display: "flex", gap: "5px"}}>
                    <span role={"img"} aria-label={"Delete"}
                          onClick={deleteCard}>❌</span>
                    <a href={`https://google.com/search?q=${encodeURIComponent(data.name)}`} target="_blank" rel="noopener noreferrer">
                        <span role={"img"} aria-label={"Related News"}>🄽</span>
                    </a>
                </div>
            </div>
        </div>
    );
});
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HorizontalScroll() {
  const nav = useNavigate();
  const handleClick = (id) => {
    nav("/product/" + id);
  };

  //http://localhost:1000
  const [dataList, setDataList] = useState();

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json()) // Parse the JSON data here
      .then((data) => {
        setDataList(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="scroll-container">
      <p className="scroll-title">Top picks</p>
      <div className="row-scroll hide_scroll">
        <div className="row-box">
          {dataList?.map((item) => (
            <div
              key={item.productId}
              onClick={() => handleClick(item.productId)}
              className="item link-style"
            >
              <img src={item.imgUrl} />
              <p>{item.name}</p>
              <h1>₹&nbsp;{item.price}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
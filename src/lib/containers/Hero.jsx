import React from "react";
import "../styles/Hero.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const nav = useNavigate();
  function handleNav(cat) {
    nav("/categories/" +cat);
  }

  return (
    <div className="grid-container font-pop">
      <div onClick={() => handleNav("Fashion")} className="featured grid-one">
        <div className="featured-overlay " />
        <img src="https://www.upscalelivingmag.com/wp-content/uploads/2022/05/elegant-premium-clothing-store.jpg" />
        <p className="featured-text text-xl">Fashion</p>
      </div>
      <div onClick={() => handleNav("Selfcare")} className="featured grid-two">
        <div className="featured-overlay" />
        <img src="https://organicaffaire.com/cdn/shop/products/organic-affaire-juniper-face-wash.jpg?v=1678976265" />
        <p className="featured-text text-xl">Selfcare</p>
      </div>

      <div onClick={() => handleNav("Furnitures")} className="featured grid-four">
        <div className="featured-overlay" />
        <img src="https://images.squarespace-cdn.com/content/v1/56f2595e8a65e2db95a7d983/1588193286207-HHHQJK93AMGW0LBBAH7K/HC4.jpg" />
        <p className="featured-text text-lg">Interior</p>
      </div>
      <div
        onClick={() => handleNav("Electronics")}
        className="featured grid-four-low"
      >
        <div className="featured-overlay" />
        <img src="https://cdn.autonomous.ai/static/upload/images/common/upload/20210209/MacBook-Desk-Setup-A-Complete-Guide-for-Apple-Lovers_27e2fe6dd0d.jpg" />
        <p className="featured-text text-lg">Electronics</p>
      </div>
    </div>
  );
}
{
  /* <div className="h-full">
<img
  className="h-full w-full object-cover"
  src="https://as2.ftcdn.net/jpg/03/34/79/69/360_F_334796918_r3Yhei9xJm2JBcg2cTG6V3FmLuvB9cYq.jpg"
/>
</div> */
}

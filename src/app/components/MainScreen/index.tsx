"use client";
import { Language } from "@/app/utils/language/language";
import classNames from "classnames/bind";
import bg from "../../asset/images/Banner.png";
import HeaderHome from "./HeaderHome";
import styles from "./MainScreen.module.scss";
const st = classNames.bind(styles);

export default function MainScreen() {
  return (
    <div className="">
      <div
        className=""
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
        }}
      >
        <HeaderHome />
      </div>
    </div>
  );
}

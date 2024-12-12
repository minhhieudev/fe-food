import bgKeyWord from "../../asset/images/bgKeyWord.png";
import MediaAndChannelSection from "../mediaAndChannelSection";
import MyKeywordSection from "../myKeywordSection";
import MyTopicsSection from "../myTopicsSection";
import TopTopics from "../topTopics";
import FooterKeyWord from "./FooterKeyWord";

export default function Contents() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgKeyWord.src})`,
        backgroundSize: "cover",
      }}
      className="md:px-[100px] 2xl:px-[200px] px-[10px]"
    >
      <TopTopics />
      <MyKeywordSection />
      <MyTopicsSection />
      <MediaAndChannelSection />
      <FooterKeyWord />
    </div>
  );
}

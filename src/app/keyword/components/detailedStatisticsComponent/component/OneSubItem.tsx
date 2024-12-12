import StarHollowIcon from "../Icon/Star/StarHollowIcon";
import StarSpecialIcon from "../Icon/Star/StarSpecialIcon";



const OneSubItem = ({ item }: { item: any }) => {
    return (
        <div className="keyword-modal-one-sub-platform-container">
            <div className="keyword-modal-one-sub-platform-name">{item.name}</div>
            <div className="keyword-modal-one-sub-platform-ss-follow">
                {item.follow ? (

                    <StarSpecialIcon/>
                ) : (
                    <StarHollowIcon/>
                )}
            </div>
        </div>
    );
};
export default OneSubItem;
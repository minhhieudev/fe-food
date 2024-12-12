import { TrashIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { use, useEffect, useState } from 'react';
import { MealActions } from "@/modules/meal/slice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SysStorage from '@/core/services/storage';
import { AuthSelectors } from "@/modules/auth/slice";

interface PageProps {
    params: {
        mealOrderId: string;
        orderFoodId: string;
    };
}

const EvaluateMeal = ({ params }: PageProps) => {
    const [rating, setRating] = useState<number>(0); // Đặt giá trị mặc định là 0
    const [feedback, setFeedback] = useState<string>("");

    const handleRatingChange = (value: number) => {
        setRating(value);
    };
    const dispatch = useDispatch();
   

    const addReview = () => {
        dispatch(
            MealActions.addReview({
                body: {
                    rating,
                    mealID: params?.mealOrderId,
                    content: feedback,
                    //customerID: await SysStorage.get('customerID')
                },
                onSuccess: (rs: any) => {
                    toast.success('Đã đánh giá bữa ăn');

                },
                onFail: (rs: any) => {
                    toast.error(rs);
                }
            })
        );
    }

    const handleSubmit = () => {
        // Xử lý hành động gửi phản hồi ở đây
        console.log({ rating, feedback });
    };

    return (
        <div className="p-4 max-w-2xl">
            <div className="mt-2">
                <div className="flex flex-wrap max-md:flex-col max-md:item-start gap-4 ">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="flex items-center">
                            <input
                                type="radio"
                                id={`rating-${index + 1}`}
                                name="rating"
                                value={index + 1}
                                className="mr-2"
                                checked={rating === index + 1}
                                onChange={() => handleRatingChange(index + 1)}
                            />
                            <label htmlFor={`rating-${index + 1}`} className="flex items-center cursor-pointer">
                                <span className="mr-2">{index + 1}</span>
                                {Array.from({ length: index + 1 }, (_, starIndex) => (
                                    <svg
                                        key={starIndex}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="w-6 h-6 text-yellow-400"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                        />
                                    </svg>
                                ))}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-2">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md mt-2 h-[120px] md:h-[150px] lg:h-[200px]"
                    placeholder="Nhập phản hồi"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>
            <div className="flex justify-end">
                <button className="bg-red-800 text-white mt-3 py-2 px-4 rounded-md flex justify-center items-center" onClick={addReview}>
                    <PaperAirplaneIcon width={16} />
                    <p className="text-sm ml-2">Gửi phản hồi</p>
                </button>
            </div>
        </div>
    );
};

export default EvaluateMeal;

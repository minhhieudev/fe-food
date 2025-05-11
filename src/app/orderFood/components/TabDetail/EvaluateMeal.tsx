import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { MealActions } from "@/modules/meal/slice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface PageProps {
    params: {
        mealOrderId: string;
        orderFoodId: string;
    };
}

const EvaluateMeal = ({ params }: PageProps) => {
    const [rating, setRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const dispatch = useDispatch();

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const addReview = () => {
        if (rating === 0) {
            toast.error('Vui lòng chọn số sao đánh giá');
            return;
        }
        
        dispatch(
            MealActions.addReview({
                body: {
                    rating,
                    mealID: params?.mealOrderId,
                    content: feedback,
                },
                onSuccess: (rs: any) => {
                    toast.success('Cảm ơn bạn đã đánh giá bữa ăn!');
                    setRating(0);
                    setFeedback("");
                },
                onFail: (rs: any) => {
                    toast.error(rs);
                }
            })
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Đánh giá bữa ăn của bạn
            </h2>
            
            {/* Rating Stars */}
            <div className="mb-6">
                <p className="text-gray-600 mb-3 text-center">Bạn cảm thấy bữa ăn này thế nào?</p>
                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="focus:outline-none"
                            onClick={() => handleRatingChange(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-10 h-10 transition-colors duration-200 ${
                                    star <= (hoveredRating || rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                />
                            </svg>
                        </motion.button>
                    ))}
                </div>
                <p className="text-center mt-2 text-sm text-gray-500">
                    {rating === 0 ? 'Chọn số sao để đánh giá' : 
                     rating === 1 ? 'Rất không hài lòng' :
                     rating === 2 ? 'Không hài lòng' :
                     rating === 3 ? 'Bình thường' :
                     rating === 4 ? 'Hài lòng' : 'Rất hài lòng'}
                </p>
            </div>

            {/* Feedback Textarea */}
            <div className="mb-4">
                <label htmlFor="feedback" className="block text-gray-700 text-sm font-medium mb-2">
                    Chia sẻ trải nghiệm của bạn
                </label>
                <textarea
                    id="feedback"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                    placeholder="Hãy cho chúng tôi biết bạn nghĩ gì về bữa ăn này..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                />
            </div>

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addReview}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>Gửi đánh giá</span>
            </motion.button>
        </motion.div>
    );
};

export default EvaluateMeal;

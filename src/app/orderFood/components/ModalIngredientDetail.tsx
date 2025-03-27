'use client';

import { Config } from '@/core/constants/configs';
import { XCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef } from 'react';

interface ModalIngredientProps {
    isVisible: boolean;
    onClose: () => void;
    detailIngredient?: any;
}

const ModalIngredientDetail: React.FC<ModalIngredientProps> = ({ isVisible, onClose, detailIngredient }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div 
                ref={modalRef} 
                className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 m-4 transform transition-all duration-500 scale-100 opacity-100"
            >
                {/* Close button */}
                <button 
                    onClick={onClose} 
                    className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform duration-300"
                >
                    <XCircleIcon className="h-8 w-8 text-gray-500 hover:text-red-500" />
                </button>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-900">Chi tiết thành phần</h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image with hover effect */}
                        <div className="relative w-full md:w-64 h-64 rounded-xl overflow-hidden group">
                            <img 
                                src={Config.CDN_URL + detailIngredient.image} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                                alt="image" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <h4 className="text-2xl font-bold text-gray-800">{detailIngredient.name}</h4>
                            
                            <div className="prose prose-emerald max-w-none">
                                <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: detailIngredient.description }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3">
                        {detailIngredient?.iTags?.map((tag: any, index: number) => (
                            <div 
                                key={index} 
                                className="flex items-center px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
                                style={{ borderLeft: `4px solid ${tag.color}` }}
                            >
                                <div 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: tag.color }}
                                />
                                <p className="text-gray-700 font-medium">{tag.iTagName}</p>
                            </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3">
                        <button 
                            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalIngredientDetail;

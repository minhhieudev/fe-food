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
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center" id="my-modal">
            <div ref={modalRef} className="relative w-full max-w-2xl max-sm:max-w-md bg-white rounded-lg shadow-lg p-5 m-3">
                <div className="mt-1">
                    <div className="flex justify-between">
                        <h3 className="text-xl leading-6 text-gray-900 font-bold">Chi tiết thành phần</h3>
                        <button onClick={onClose} className="text-gray-500 font-bold"><XCircleIcon className='h-7 w-7'/></button>
                    </div>
                    <div className="mt-2">
                        <div className="flex flex-col md:flex-row gap-3">
                            <img src={Config.CDN_URL + detailIngredient.image} className="w-full md:w-64 h-64 mt-1 object-cover" alt="image" />
                            <div>
                                <div className="text-xl font-bold">{detailIngredient.name}</div>
                                <div className="mt-2 text-md" dangerouslySetInnerHTML={{ __html: detailIngredient.description }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {detailIngredient?.iTags?.map((tag: any, index: number) => (
                            <div key={index} className={`flex items-center border-b-4`} style={{ borderColor: tag.color }}>
                                <div className="w-4 h-4" style={{ backgroundColor: tag.color, borderRadius: '50%' }}></div>
                                <p className="ml-2">{tag.iTagName}</p>
                            </div>
                        ))}
                    </div>
                    <div className='rounded-md w-full flex justify-end mt-3'>
                        <button className="bg-red-100 py-2 px-4 rounded-md" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalIngredientDetail;

import Image from 'next/image'
import React from 'react'
import { useBlogThumbnailStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { ThumbnailBackgroundData } from '@/types';
import { useModal } from '@/context/ModalContext';


function BackgroundCard({ name, imageUrl, recommendedColors }: ThumbnailBackgroundData) {
    const { hideModal } = useModal()
    const { addBackground } = useBlogThumbnailStore(useShallow((state) => ({ addBackground: state.addSelectedBackground })))

    const handleSelectBackground = () => {
        addBackground({ name: name, imageUrl: imageUrl, recommendedColors: recommendedColors })
        hideModal()
    }
    return (
        <div >
            <button className='ring-1 shadow-sm ring-gray-300 rounded-2xl w-[200px] h-[120px] hover:ring-2 hover:ring-slate-600 hover:shadow-lg flex justify-center cursor-pointer' onClick={handleSelectBackground}>
                <Image src={imageUrl} alt="background" width={185} height={90} className='rounded-2xl h-full w-full' />
            </button>
            <div className='mt-2'>
                <p className='font-semibold text-xs'>{name}</p>
                {/* <div>
                    <p className='font-light text-xs'>Recommended Colors</p>
                    <div className='flex space-x-2 items-center'>
                        <div className={`w-[50px] h-[20px] rounded-lg shadow-md bg-[${recommendedColors?.primary}]`}></div>
                         <div className={`w-[50px] h-[20px] rounded-lg shadow-md bg-[${recommendedColors?.secondary}]`}></div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default BackgroundCard
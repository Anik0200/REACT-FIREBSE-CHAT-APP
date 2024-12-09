import React from 'react'

const ButtonThree = ({ ButtonThreeText }) => {
    return (
        <>
            <div>
                <button className='py-1 px-2 md:py-2 md:px-3 lg:py-2 lg:px-5 text-[12px] lg:text-[15px]

                    rounded-md bg-green-400 text-gray-600'>

                    {ButtonThreeText}
                </button>
            </div>
        </>
    )
}

export default ButtonThree

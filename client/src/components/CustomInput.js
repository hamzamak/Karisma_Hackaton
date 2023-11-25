import React from 'react'

function CustomInput({ labelName,name,type="text", isError= false, messageError, value, onChange, placeholder }) {
    return (
        <div>
            <p  className="mb-2 text-sm font-medium">{labelName} </p>
            <input type={type} name={name} min={1}   className={`bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg  w-full p-2.5 outline-none ${isError && "border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 placeholder-red-700 "}`} placeholder= {placeholder} value={value} onChange={onChange} />
            {
                isError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500"> {messageError} </p>
                )
             }
        </div>
    )
}

export default CustomInput
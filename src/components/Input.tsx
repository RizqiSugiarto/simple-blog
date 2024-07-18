import React from 'react';
import { Dispatch, SetStateAction } from 'react';

type InputType = {
    label?: string;
    type: string;
    setData: Dispatch<SetStateAction<string>>;
    placeholder: string;
    className?: string;
    classInput?: string;
    auth?: boolean;
    required?: boolean;
    value?: any;
};

const Input: React.FC<InputType> = ({
    label,
    type,
    setData,
    placeholder,
    className,
    auth,
    classInput,
    required,
    value
}) => {
    return (
        <div className={'form-control ' + className}>
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input
                required={required}
                value={value}
                type={type || 'text'}
                placeholder={placeholder || label}
                onChange={(e) => setData(e.target.value)}
                className={`input ${!auth && 'input-sm md:input-md'} input-bordered focus:outline-none border-gray-300 focus:border-purple-500 w-full ${classInput}`}
            />
        </div>
    );
};

export default Input;

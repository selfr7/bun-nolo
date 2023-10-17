import React from 'react';
import {FieldProps} from './type';

export const EnumField: React.FC<FieldProps> = ({
  id,
  register,
  label,
  options,
}) => (
  <div className="flex flex-col space-y-2">
    <label
      htmlFor={id}
      className="block text-md font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      {...register(id)}
      className="w-full p-2 border rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out shadow-sm hover:shadow-md">
      {options &&
        options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  </div>
);

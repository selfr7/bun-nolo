import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "components/Form/FormField";
import { createFieldsFromDSL } from "components/Form/createFieldsFromDSL";

import { userFormSchema } from "../schema";
import { UserContext } from "../UserContext";

const formDSL = {
  username: {
    type: "string",
    min: 1,
  },
  password: {
    type: "password",
    min: 6,
  },
};
const fields = createFieldsFromDSL(formDSL);

const Login: React.FC = () => {
  const { login } = useContext(UserContext);
  const { t } = useTranslation();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userFormSchema),
  });

  // const onChange = (name: string, values: string) => {
  //   console.log('value', name, values);
  //   const willSaveData = `${name}:${values}`;
  //   change('3-myNoloConfig', willSaveData);
  // };

  const onSubmit = async (user) => {
    try {
      await login(user);
    } catch (noloError) {
      console.error(noloError);

      let message;
      switch (noloError.message) {
        case "404":
          message = t("errors.userNotFound");
          break;
        case "403":
          message = t("errors.invalidCredentials");
          break;
        case "400":
          message = t("errors.validationError");
          break;
        case "500":
        default:
          message = t("errors.serverError");
          break;
      }

      setError(message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-96 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-xl font-bold mb-4">{t("login")}</h2>
          {fields.map((field) => (
            <FormField
              {...field}
              key={field.id}
              register={register}
              errors={errors}
            />
          ))}
          {error && <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
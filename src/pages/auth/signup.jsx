import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { parsePhoneNumber, getCountries } from "libphonenumber-js";
import { useForm } from "react-hook-form";
import Link from "next/link";
import fetcher from "../../utils/fetcher";
import SpinnerIcon from "../../components/SpinnerIcon";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const SignupAuthentication = () => {
  const formSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required").trim(""),
    last_name: Yup.string().required("Last name is required").trim(""),
    phone_number: Yup.string().required("Phone number is required"),
    email: Yup.string().required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const { country_code, phone_number } = data;
    const phoneUtils = parsePhoneNumber(phone_number, country_code ?? "NG");
    if (!phoneUtils.isValid()) return toast.error(`Invalid phone number`);

    setLoading(true);
    fetcher("/signup", data)
      .then((response) => {
        toast.success(response.message);
        router.replace("/");
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const countries = getCountries();
  return (
    <div className="min-h-screen h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a free account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link href="/auth/login">
            <a className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Login here
            </a>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  id="first_name"
                  type="text"
                  autoComplete="first-name"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("first_name", { required: true })}
                />
                {errors?.first_name ? (
                  <p className="text-left text-red-600 text-xs mt-1">
                    {errors.first_name?.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  id="last_name"
                  type="text"
                  autoComplete="surname"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("last_name", { required: true })}
                />
                {errors?.last_name ? (
                  <p className="text-left text-red-600 text-xs mt-1">
                    {errors.last_name?.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("email", { required: true })}
                />
                {errors?.email ? (
                  <p className="text-left text-red-600 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    autoComplete="country"
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    {...register("country_code", { required: true })}
                    defaultValue={"NG"}
                  >
                    {countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                    {errors?.country_code ? (
                      <p className="text-left text-red-600 text-xs mt-1">
                        {errors.country_code?.message}
                      </p>
                    ) : null}
                  </select>
                </div>
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
                  placeholder="(555) 987-6543"
                  {...register("phone_number", { required: true })}
                />
              </div>
              {errors?.phone_number ? (
                <p className="text-left text-red-600 text-xs mt-1">
                  {errors.phone_number?.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("password", { required: true })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={
                  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " +
                  (loading && "bg-opacity-70 cursor-not-allowed")
                }
              >
                {loading ? <SpinnerIcon /> : <span>Signup</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupAuthentication;

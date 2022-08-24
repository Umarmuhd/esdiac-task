import type { NextPage } from "next";
import Image from "next/image";
import { Popover } from "@headlessui/react";

import { useMe } from "@/hooks/data/useMe";
import fetcher from "../../src/utils/fetcher";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

const Home: NextPage = () => {
  const { user, isLoading } = useMe();

  const router = useRouter();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!isLoading && !user) router.replace("/auth/login");
  }, [user, isLoading, router]);

  const handleLogout = () => {
    fetcher("/logout")
      .then((response) => {
        toast.success(response.message);
        mutate("/me");
        router.replace("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-full">
      <Popover
        as="header"
        className="pb-24 bg-gradient-to-r from-sky-800 to-cyan-600"
      >
        <>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              {/* Logo */}
              <div className="absolute left-0 py-5 flex-shrink-0 lg:static mb-10">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  {/* https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg */}
                  <svg
                    className="h-8 w-auto"
                    fill="none"
                    viewBox="0 0 35 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#A5F3FC"
                      d="M15.258 26.865a4.043 4.043 0 01-1.133 2.917A4.006 4.006 0 0111.253 31a3.992 3.992 0 01-2.872-1.218 4.028 4.028 0 01-1.133-2.917c.009-.698.2-1.382.557-1.981.356-.6.863-1.094 1.47-1.433-.024.109.09-.055 0 0l1.86-1.652a8.495 8.495 0 002.304-5.793c0-2.926-1.711-5.901-4.17-7.457.094.055-.036-.094 0 0A3.952 3.952 0 017.8 7.116a3.975 3.975 0 01-.557-1.98 4.042 4.042 0 011.133-2.918A4.006 4.006 0 0111.247 1a3.99 3.99 0 012.872 1.218 4.025 4.025 0 011.133 2.917 8.521 8.521 0 002.347 5.832l.817.8c.326.285.668.551 1.024.798.621.33 1.142.826 1.504 1.431a3.902 3.902 0 01-1.504 5.442c.033-.067-.063.036 0 0a8.968 8.968 0 00-3.024 3.183 9.016 9.016 0 00-1.158 4.244zM19.741 5.123c0 .796.235 1.575.676 2.237a4.01 4.01 0 001.798 1.482 3.99 3.99 0 004.366-.873 4.042 4.042 0 00.869-4.386 4.02 4.02 0 00-1.476-1.806 3.994 3.994 0 00-5.058.501 4.038 4.038 0 00-1.175 2.845zM23.748 22.84c-.792 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.806 4.042 4.042 0 00.869 4.387 3.99 3.99 0 004.366.873A4.01 4.01 0 0027.08 29.1a4.039 4.039 0 00-.5-5.082 4 4 0 00-2.832-1.18zM34 15.994c0-.796-.235-1.574-.675-2.236a4.01 4.01 0 00-1.798-1.483 3.99 3.99 0 00-4.367.873 4.042 4.042 0 00-.869 4.387 4.02 4.02 0 001.476 1.806 3.993 3.993 0 002.226.678 4.003 4.003 0 002.832-1.18A4.04 4.04 0 0034 15.993z M5.007 11.969c-.793 0-1.567.236-2.226.678a4.021 4.021 0 00-1.476 1.807 4.042 4.042 0 00.869 4.386 4.001 4.001 0 004.366.873 4.011 4.011 0 001.798-1.483 4.038 4.038 0 00-.5-5.08 4.004 4.004 0 00-2.831-1.181z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      </Popover>
      <main className="mt-10 md:-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}

          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {/* Welcome panel */}
            <section aria-labelledby="profile-overview-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                      <div className="flex-shrink-0">
                        <img
                          className="mx-auto h-20 w-20 rounded-full"
                          src={user?.image ?? "/assets/images/avatar.png"}
                          alt="..."
                        />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p className="text-sm font-medium text-gray-600">
                          Welcome back,
                        </p>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {user?.first_name} {user?.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <button
                        onClick={handleLogout}
                        className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                  <div className="px-6 py-5 text-sm font-medium text-center">
                    <span className="text-gray-600">{user?.email}</span>
                  </div>
                  <div className="px-6 py-5 text-sm font-medium text-center">
                    <span className="text-gray-600">
                      {user?.dail_code}
                      {user?.phone_number}
                    </span>
                  </div>
                  <div className="px-6 py-5 text-sm font-medium text-center">
                    <span className="text-gray-600">{user?.country_code}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">&copy; 2022.</span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

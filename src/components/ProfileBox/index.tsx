"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProfileBox = () => {
  return (
    <>
      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src="/images/cover/garage-cover.png"
            alt="Garage Cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="coverPhoto"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[3px] bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                accept="image/png, image/jpg, image/jpeg"
              />
              <span>
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.69882 3.365C5.89894 2.38259 6.77316 1.6875 7.77475 1.6875H10.2252C11.2268 1.6875 12.1011 2.38259 12.3012 3.36499..."
                    fill=""
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src="/images/user/garage-owner.png"
                width={160}
                height={160}
                className="overflow-hidden rounded-full"
                alt="Garage Owner"
              />
            </div>

            <label
              htmlFor="profilePhoto"
              className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.69882 3.365C5.89894 2.38259 6.77316 1.6875 7.77475 1.6875H10.2252C11.2268 1.6875 12.1011 2.38259 12.3012 3.36499..."
                  fill=""
                />
              </svg>

              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                className="sr-only"
                accept="image/png, image/jpg, image/jpeg"
              />
            </label>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              Rahul Verma
            </h3>
            <p className="font-medium">Owner, Sai Motors</p>
            <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  1,245
                </span>
                <span className="text-body-sm">Vehicles Serviced</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  ₹3.5L
                </span>
                <span className="text-body-sm">Revenue</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  230
                </span>
                <span className="text-body-sm">Spare Parts Sold</span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">About Me</h4>
              <p className="mt-4">
                Rahul Verma is the owner of Sai Motors, a premier automobile service
                center in New Delhi. With over a decade of experience, Rahul leads
                a team that specializes in comprehensive car servicing and
                high-quality spare parts distribution. Sai Motors is known for
                its commitment to customer satisfaction and innovation in
                automotive services.
              </p>
            </div>

            <div className="mt-4.5">
              <h4 className="mb-3.5 font-medium text-dark dark:text-white">
                Follow us on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link href="#" className="hover:text-primary" aria-label="social-icon">
                  {/* SVG for Facebook */}
                </Link>
                <Link href="#" className="hover:text-primary" aria-label="social-icon">
                  {/* SVG for Instagram */}
                </Link>
                <Link href="#" className="hover:text-primary" aria-label="social-icon">
                  {/* SVG for LinkedIn */}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;

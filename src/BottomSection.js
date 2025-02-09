import React from 'react';

export function BottomSection() {
  return (
    <section className="mt-12 w-full max-w-[1200px] max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[24%] max-md:ml-0 max-md:w-full">
          <p className="self-stretch my-auto text-sm leading-7 text-white bg-blend-difference max-md:mt-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse congue mollis mauris eget faucibus. Donec fermentum
            nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
            quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
          </p>
        </div>
        <div className="ml-5 w-[76%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/c5c4dcea1058dc2d8aa41666edf010b1d9481e70347378ba11885951e8e67310?placeholderIfAbsent=true"
            className="object-contain grow w-full aspect-[0.77] max-md:mt-7 max-md:max-w-full"
            alt="Bottom section image"
          />
        </div>
      </div>
    </section>
  );
}
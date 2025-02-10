import React from 'react';

export function MiddleSection() {
  return (
    <section className="self-stretch mt-52 w-full bg-black max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="w-[70%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/0d8dfe556bfb13ac08e9dfb8f01e5823f27e99f7465a9f6776ea6ca9fea8f72b?placeholderIfAbsent=true"
            className="object-contain self-stretch my-auto w-full bg-blend-difference aspect-[0.68] max-md:mt-0 max-md:max-w-full"
            alt="Featured image"
          />
        </div>
        <div className="ml-5 w-[30%] max-md:ml-0 max-md:w-full">
          <p className="self-stretch my-auto text-sm leading-7 text-white bg-blend-difference max-md:mt-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Suspendisse congue mollis mauris eget faucibus. Donec fermentum
            nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
            quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
          </p>
        </div>
      </div>
    </section>
  );
}
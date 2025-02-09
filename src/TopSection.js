import React from 'react';

export function TopSection() {
  return (
    <section className="flex flex-col mr-11 w-full text-center max-w-[1032px] max-md:mr-2.5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/c6dd33c4a00b37ee265456a1dbc491869bb1b32a56640562df0a52966619a75b?placeholderIfAbsent=true"
        className="object-contain self-end aspect-[1.06] w-[37px]"
        alt="Decorative icon"
      />
      <p className="self-center mt-28 text-xs font-light tracking-wide leading-6 text-neutral-400 max-md:mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
        imperdiet.
      </p>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/5a169bdd1327fc21ecddfd254bf76e0f183459ee15229da45179cbcabdb05d2c?placeholderIfAbsent=true"
        className="object-contain mt-32 w-full aspect-[0.84] max-w-[930px] max-md:mt-10 max-md:max-w-full"
        alt="Featured content"
      />
      <p className="self-center mt-16 text-sm leading-7 text-white bg-blend-difference max-md:mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
        imperdiet. Donec diam velit, bibendum in volutpat quis, ullamcorper eu
        neque. Etiam rhoncus erat non quam vehicula.
      </p>
    </section>
  );
}
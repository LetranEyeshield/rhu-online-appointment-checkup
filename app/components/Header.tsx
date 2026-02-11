import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Mobile: stacked | Desktop: horizontal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/best-rhu-logo.jpg"
              alt="Best RHU-Manaoag Logo"
              width={160}
              height={160}
              className="w-24 h-24 md:w-36 md:h-36 object-contain"
              priority
            />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold tracking-wide text-gray-800">
              RURAL HEALTH UNIT
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              Municipality of Manaoag
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/best-mayor-kim-amador.jpg"
              alt="Best Mayor of Manaoag"
              width={160}
              height={160}
              className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-full border-4 border-yellow-400 shadow-md"
              priority
            />
          </div>

        </div>
      </div>
    </header>
  );
}

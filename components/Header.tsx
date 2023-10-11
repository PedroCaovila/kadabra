import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="backdrop-blur-[1px] rounded-lg bg-white/70 flex justify-center items-center w-full border-b-auto pb-10 sm:px-4 px-2 max-w-[900px]">
      <Link href="/" className="flex space-x-2 mx-auto mt-10 items-center">
        <Image
          alt="header text"
          src="/kadabra.png"
          className="sm:w-20 sm:h-20 w-6 h-6"
          width={100}
          height={100}
        />
        <h1 className="text-center sm:text-6xl text-5xl mt-center font-bold tracking-tight flex items-center ">
          Kadabra
        </h1>
      </Link>
      <a
        href="https://wa.me/+5535988375653"
        target="_blank"
        rel="noreferrer"
      ></a>
    </header>
  );
}

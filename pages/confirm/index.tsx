import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Confirm: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col  justify-center py-2 bg-zinc-900">
      <Head>
        <title>Bolão da Copa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center py-5">
        <Image
          src="/logo.png"
          alt="Bolão da Copa logo"
          width={474}
          height={263}
        />

        <h1 className="text-white text-lg font-bold font-Kanit text-center mt-5">
          Seu endereço de e-mail foi confirmado!
        </h1>
        <p className="text-white font font-Kanit text-sm">
          Use este novo endereço para fazer login no aplicativo Bolão da Copa.
        </p>
      </main>

      <footer className="flex justify-center">
        <p className="text-white font-Kanit text-xs">
          Thiago Bignotto 2022 © bignotto@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default Confirm;

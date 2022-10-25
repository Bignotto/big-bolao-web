import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { supabase } from "../../utils/supabase";

const Confirm: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allRight, setAllRight] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  async function loadUser() {
    const session = await supabase.auth.getSession();

    if (!session.data.session) {
      setAllRight(false);
      setIsLoading(false);
      return;
    }

    const theUser = await supabase.auth.getUser();

    setNewEmail(theUser.data.user?.email ?? "erro!");
    setIsLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="flex min-h-screen flex-col  justify-center py-2 bg-zinc-900">
      <Head>
        <title>Bolão da Copa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <h1 className="text-white text-lg font-bold font-Kanit text-center mt-5">
          Recuperando informações...
        </h1>
      ) : (
        <main className="flex flex-col items-center py-5">
          <Image
            src="/logo.png"
            alt="Bolão da Copa logo"
            width={474}
            height={263}
          />
          {!allRight ? (
            <>
              <h1 className="text-white text-3xl font-Kanit text-center mt-5">
                Aconteceu um erro e este link não serve mais para confirmar a
                alteração do seu endereço e e-mail.
              </h1>
              <p className="text-white text-xl font-Kanit text-center mt-5">
                Volte ao aplicativo e solicite a alteração novamente.
                <br />
              </p>
            </>
          ) : (
            <>
              <h1 className="text-white text-lg font-bold font-Kanit text-center mt-5">
                Seu endereço de e-mail {newEmail} foi confirmado!
              </h1>
              <p>
                Use este novo endereço para fazer login no aplicativo Bolão da
                Copa.
              </p>
            </>
          )}
        </main>
      )}
      <footer className="flex justify-center">
        <p className="text-white font-Kanit text-xs">
          Thiago Bignotto 2022 © bignotto@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default Confirm;

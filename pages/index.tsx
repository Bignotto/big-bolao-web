import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";

import Image from "next/image";
import Head from "next/head";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [canUpdate, setCanUpdate] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updated, setUpdated] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const router = useRouter();

  async function loadUser() {
    const session = await supabase.auth.getSession();

    if (!session.data.session) {
      setCanUpdate(false);
      setIsLoading(false);
      return;
    }

    const theUser = await supabase.auth.getUser();
    setUserEmail(theUser.data.user?.email ?? "sem usuário");

    setCanUpdate(true);
    setIsLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function handleSaveNewPassword(e: FormEvent) {
    e.preventDefault();

    alert(`canUpdate: ${canUpdate}`);

    if (canUpdate) {
      if (newPassword.length < 5) {
        alert("A senha é muito curta!");
        return;
      }
      if (newPassword !== confirmation) {
        alert("As senhas não são iguais!");
        return;
      }

      const { data, error } = await supabase.auth.updateUser({
        password: newPassword!,
      });

      if (data) {
        alert("Senha atualizada! Agora você já pode entrar no aplicativo.");
        setUpdated(true);
      }
      if (error)
        alert(
          "Alguma coisa errada aconteceu. Aguarde alguns minutos e tente novamente."
        );
    }
  }

  async function resetBigPassword(e: FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      "bignotto@gmail.com"
    );

    if (error) {
      alert("deu ruim");
      console.log({ error });
    }
  }

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
          {!canUpdate ? (
            <>
              <h1 className="text-white text-3xl font-Kanit text-center mt-5">
                Aconteceu um erro e este link não serve mais para atualizar sua
                senha.
              </h1>
              <p className="text-white text-xl font-Kanit text-center mt-5">
                Volte ao aplicativo e solicite a recuperação de senha novamente.
                <br />
                {userEmail}
              </p>
            </>
          ) : (
            <>
              <h1 className="text-white text-lg font-bold font-Kanit text-center mt-5">
                Recuperação de senha para {userEmail}
              </h1>
              <form onSubmit={(e) => handleSaveNewPassword(e)}>
                <div className="flex flex-col gap-1">
                  <p className="text-white font-Kanit text-lg mt-3">
                    Digite sua nova senha:
                  </p>
                  <input
                    type="text"
                    placeholder="Nova senha"
                    className="bg-gray-700 rounded p-3 text-white font-Kanit "
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <p className="text-white font-Kanit text-lg mt-3">
                    Confirme sua nova senha:
                  </p>
                  <input
                    type="text"
                    placeholder="Confirme sua senha"
                    className="bg-gray-700 rounded p-3 text-white font-Kanit "
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="rounded bg-green-600 text-white font-bold font-Kanit h-11 mt-5"
                  >
                    Salvar nova senha
                  </button>
                </div>
              </form>
            </>
          )}
        </main>
      )}
      <footer className="flex justify-center">
        {/* <button
          className="bg-red-500 text-white font-bold font-Kanit h-11 mt-5 rounded w-52"
          onClick={(e) => resetBigPassword(e)}
        >
          Reset big password!
        </button> */}
        <p className="text-white font-Kanit text-xs">
          Thiago Bignotto 2022 - bignotto@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default Home;

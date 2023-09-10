
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { DisciplinasType } from '../components/DropDown';
import DropDown2, { HabilidadesType } from '../components/DropDown2';
import Footer from '../components/Footer';
import Github from '../components/GitHub';
import Header from '../components/Header';
import { useChat } from 'ai/react';

export default function Page() {
  const [bio, setBio] = useState('');
  const [disciplina, setdisciplina] = useState('Selecione a disciplina...');
  const [habilidade, sethabilidade] = useState('Selecione a habilidade...');
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        disciplina,
        habilidade,
        bio,
      },
      onResponse() {
        scrollToBios();
      },
    });''

  const onSubmit = (e: any) => {
    setBio(input);
    handleSubmit(e);
  };

  const lastMessage = messages[messages.length - 1];
  const generatedBios = lastMessage?.role === "assistant" ? lastMessage.content : null;

  return (
    <div className="flex  mx-auto flex-col items-center justify-center py-2 min-h-screen bg-cover bg-contain"
      style={{background: "no-repeat center/cover url(/bkgrnd.png)"}}>

      <Header />
      <main className="flex flex-1 flex-col items-center justify-center text-center px-auto sm:mt-10 bg-cover bg-contain"
       style={{backgroundImage: "url(/mainbkg.png)", minHeight: "100vh"}}>
        
        <h1 className="sm:text-5xl text-4xl max-w-[708px] font-bold mt-5 text-slate-900">
          Qual atividade você gostaria de elaborar hoje?
        </h1>
        <p className="text-slate-500 mt-5">Usando IA para elaborar atividades escolares em um passe de mágica.</p>
        <form className="max-w-xl w-full" onSubmit={onSubmit}>
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Descreva brevemente o tema de sua atividade{' '}
              <span className="text-slate-500">
                (ou digite algumas palavras chave e eu cuidarei do resto)
              </span>
              .
            </p>
          </div>
          <textarea
            value={input}
            onChange={handleInputChange}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              '"Síntese proteica e hipertrofia muscular", "Formas geométricas espaciais, vértices, arestas e faces", "Conceito de Cultura Sustentável"... '
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Escolha a disciplina.</p>
          </div>
          <div className="block">
            <DropDown disciplina={disciplina} setdisciplina={(newdisciplina) => setdisciplina(newdisciplina)} />
          </div>

          <div className="flex mt-5 mb-5 items-center space-x-3">
            <Image src="/3-black.png" width={28} height={28} alt="1 icon" />
            <p className="text-left font-medium">Escolha a habilidade BNCC desejada.</p>
          </div>
          <div className="block">
            <DropDown2 habilidade={habilidade} sethabilidade={(newhabilidade) => sethabilidade(newhabilidade)} />
          </div>

          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-contain"
              type="submit"
            >
             Gerar palavras mágicas &rarr;
            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <span className="loading">
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
                <span style={{ backgroundColor: 'white' }} />
              </span>
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <output className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Your generated bios
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf('1') + 3)
                  .split('2.')
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast('Comando copiado para a área de transferência', {
                            icon: '📋',
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </output>
      </main>
      <Footer />
    </div>
  );
}

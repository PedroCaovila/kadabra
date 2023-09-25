
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { DisciplinasType } from '../components/DropDown';
import DropDown2, { HabilidadesType } from '../components/DropDown2';
import DropDown3, { AtividadesType } from '../components/DropDown3';
import DropDown4, { ObjetivosType } from '../components/DropDown4';
import DropDown5, { IdadesType } from '../components/DropDown5';
import DropDown6, { DificuldadesType } from '../components/DropDown6';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useChat } from 'ai/react';
import React from 'react';

export default function Page() {
  const [bio, setBio] = useState('');
  const [disciplina, setdisciplina] = useState('Selecione a disciplina...');
  const [habilidade, sethabilidade] = useState('Selecione a habilidade...');
  const [atividade, setatividade] = useState('Selecione a atividade...');
  const [objetivo, setobjetivo] = useState('Selecione um objetivo...');
  const [idade, setidade] = useState('Selecione uma faixa etária...');
  const [dificuldade, setdificuldade] = useState('Selecione a dificuldade...');
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
        atividade,
        objetivo,
        idade,
        dificuldade,
        bio,
      },
      onResponse() {
        scrollToBios();
      },
    });

  const onSubmit = (e: any) => {
  };

  const frase = "Utilizando como a habilidade " + habilidade + " da BNCC, mas sem cita-la, crie um pequeno texto base utilizando a Taxonomia de Bloom na finalidade de " + objetivo + ", elabore uma/um " + atividade + " de nível " + dificuldade + " da disciplina " + disciplina + " com o tema " + input + " para alunos de " + idade + ".";

  return (
    <div className="flex  mx-auto flex-col items-center justify-center py-2 min-h-screen bg-cover bg-contain"
      style={{ background: "no-repeat center/cover url(/bkgrnd.png)" }}>

      <Header />
      <main
        className="backdrop-blur-[1px] rounded-lg bg-white/70 flex flex-1 flex-col items-center justify-center text-center px-auto sm:mt-10 bg-cover bg-contain">

        <h1 className="sm:text-5xl text-4xl max-w-[900px] font-bold mt-10 text-slate-900">
          Qual atividade você gostaria de elaborar hoje?
        </h1>
        <p className="text-slate-500 mt-5 font-semibold">Usando IA para elaborar atividades escolares em um passe de mágica.</p>
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
            <p className="text-left font-medium">Escolha a habilidade BNCC desejada.{' '}
              <span className="text-slate-500">
                <a href="https://media.tutormundi.com/wp-content/uploads/2021/01/27200057/habilidades-bncc-ensino-fundamental-1024x1024.png" target="_blank">
                  (Saiba mais)
                </a>
              </span>
            </p>
          </div>
          <div className="block">
            <DropDown2 habilidade={habilidade} sethabilidade={(newhabilidade) => sethabilidade(newhabilidade)} />
          </div>

          <div className="flex mt-5 mb-5 items-center space-x-3">
            <Image src="/4-black.png" width={28} height={28} alt="1 icon" />
            <p className="text-left font-medium">Escolha o tipo de atividade.</p>
          </div>
          <div className="block">
            <DropDown3 atividade={atividade} setatividade={(newatividade) => setatividade(newatividade)} />
          </div>

          <div className="flex mt-5 mb-5 items-center space-x-3">
            <Image src="/5-black.png" width={28} height={28} alt="1 icon" />
            <p className="text-left font-medium">Escolha qual o objetivo da sua atividade{' '}
              <span className="text-slate-500">
                (usaremos a Taxonomia de Bloom para ajudar na criação da atividade)
              </span>
              .
            </p>
          </div>
          <div className="block">
            <DropDown4 objetivo={objetivo} setobjetivo={(newobjetivo) => setobjetivo(newobjetivo)} />
          </div>

          <div className="flex mt-5 mb-5 items-center space-x-3">
            <Image src="/6-black.png" width={28} height={28} alt="1 icon" />
            <p className="text-left font-medium">Escolha a faixa etária dos alunos.</p>
          </div>
          <div className="block">
            <DropDown5 idade={idade} setidade={(newidade) => setidade(newidade)} />
          </div>

          <div className="flex mt-5 mb-5 items-center space-x-3">
            <Image src="/7-black.png" width={28} height={28} alt="1 icon" />
            <p className="text-left font-medium">Escolha a dificuldade da atividade.</p>
          </div>
          <div className="block">
            <DropDown6 dificuldade={dificuldade} setdificuldade={(newdificuldade) => setdificuldade(newdificuldade)} />
          </div>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />
          <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
          {!isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-70"
              type="submit"
              onClick={() => {
                navigator.clipboard.writeText(frase);
                toast('Comando copiado para a área de transferência', { icon: '📋' });
              }}
            >
              Gerar palavras mágicas &rarr;


            </button>
          )}
          {isLoading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-70"
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
        <output className="space-y-10 my-10">

        </output>
      </main>
      <Footer />
    </div>
  );
}
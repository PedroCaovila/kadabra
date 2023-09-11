import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export type DificuldadesType = "Selecione a dificuldade...";

interface Dropdown6Props {
  dificuldade: string; // Altere para usar uma string em vez de um tipo fixo
  setdificuldade: (dificuldade: string) => void;
}

export default function Dropdown6({ dificuldade, setdificuldade }: Dropdown6Props) {
  const [dificuldades, setdificuldades] = useState<string[]>([]);

  useEffect(() => {
    // Carregar dificuldades do arquivo de texto "dificuldades.txt"
    fetch('dificuldades.txt')
      .then(response => response.text())
      .then(data => {
        // Dividir o conteúdo do arquivo em linhas e remover linhas em branco
        const lines = data.split('\n').filter(line => line.trim() !== '');

        setdificuldades(lines);
      });
  }, []); // Executa apenas uma vez durante o carregamento do componente

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {dificuldade}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="overflow-y-scroll max-h-[150px] absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={dificuldade}
        >
          <div className="">
            {dificuldades.map((dificuldadeItem) => (
              <Menu.Item key={dificuldadeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setdificuldade(dificuldadeItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      dificuldade === dificuldadeItem ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{dificuldadeItem}</span>
                    {dificuldade === dificuldadeItem ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
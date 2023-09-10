import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropDown2Props {
  habilidade: string;
  sethabilidade: (habilidade: string) => void;
}

export default function DropDown2({
  habilidade,
  sethabilidade,
}: DropDown2Props) {
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredHabilidades, setFilteredHabilidades] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Adicionado estado para controlar se o dropdown está aberto

  useEffect(() => {
    fetch("habilidades.txt")
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split("\n").filter((line) => line.trim() !== "");

        setHabilidades(lines);
      });
  }, []);

  useEffect(() => {
    const filtered = habilidades.filter((habilidadeItem) =>
      habilidadeItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHabilidades(filtered);
  }, [habilidades, searchTerm]);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Alterne o estado do dropdown ao clicar no botão
        >
          {habilidade}
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
        show={isDropdownOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterLeave={() => setIsDropdownOpen(false)} // Fecha o dropdown após sair da transição
      >
        <Menu.Items
          className="overflow-y-scroll max-h-[150px] absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          key={habilidade}
        >
          <div className="">
            {/* Campo de pesquisa dentro do dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-300 px-4 py-2 pl-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Pesquisar habilidade"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== "" && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {filteredHabilidades.map((habilidadeItem) => (
              <Menu.Item key={habilidadeItem}>
                {({ active }) => (
                  <button
                    onClick={() => {
                      sethabilidade(habilidadeItem);
                      closeDropdown(); // Fecha o dropdown ao selecionar uma habilidade
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      habilidade === habilidadeItem ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <span>{habilidadeItem}</span>
                    {habilidade === habilidadeItem ? (
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

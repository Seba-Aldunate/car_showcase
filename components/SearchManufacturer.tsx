"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";

import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === "" // Consulta si hay query
      ? manufacturers // si no la hay retorna todas las marcas
      : manufacturers.filter(
          (
            item // else retorna las marcas con los siguientes filtros
          ) =>
            item
              .toLowerCase() // convierte en minúsculas
              .replace(/\s+/g, "") // regex que remplaza los espacios vacíos por strings vacío
              .includes(
                query.toLowerCase().replace(/\s+/g, "") // comprueba coincidencias entre las marcas y la query
              )
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>

          {/* Input para búsqueda */}
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)} // Actualiza la query cuando el input cambia
          />

          {/* Transicion para desplegar las opciones */}
          <Transition
            as={Fragment} // agrupa múltiples elementos sin introducir un nodo DOM adicional, es decir, <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")} // Resetea la búsqueda una vez completada la transición
            >
            <Combobox.Options
              // className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
              // static
            >
              {filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => ( // Permite saber que opción está activa o seleccionada.
                      <> {/* Dentro retorna un fragment y renderiza el código */}
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Muestra un bg azul si la opción es seleccionada */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-white"
                                : "text-pribg-primary-purple"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;

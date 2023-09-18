"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); // Estado para almacenar la opción seleccionada

  //Actualiza los parámetros de búsqueda de URL y navegue hasta la nueva URL
  const handleUpdateParams = (e: { title: string; value: string }) => { // Primero captura el evento, ya que dentro almacena los parametros.
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName, {scroll: false});
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); //Actuliza la opción seleccionada en el state
          handleUpdateParams(e); // Actualiza los parámetros de búsqueda de URL, contiene el e.value.
        }}
      >
        <div className="relative w-fit z-10">
          {/* Boton del listbox */}
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron_up-down"
            />
          </Listbox.Button>
          {/* Transicion que desplega las opciones */}
          <Transition
            as={Fragment} // <></> Agrupa multiples elementos sin crear un nodo DOM adicional . 
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {/* Mapea las opciones y las muestra como una listbox  */}
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) => 
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.title}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

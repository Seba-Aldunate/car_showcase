"use client";

import { useRouter } from "next/navigation";

import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";
import { CustomButton } from ".";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    // Calcula el nuevo limite 
    const newLimit = (pageNumber + 1) * 10;

    // Actualiza el parametro de limite de busqueda en la URL con el nuevo valor 

    // updateSearchParams -> Segundo parámetro debe ser un string, por lo que se envuelve en el contructor string() o en un template string
    const newPathname = updateSearchParams("limit", `${newLimit}`); 

    router.push(newPathname, {scroll: false});
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Mostrar más"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
import React from "react";
import Image from "next/image";

const Character = ({ characters }) => {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <Image
              src={character.image}
              alt={character.name}
              height={300}
              width={300}
            />
            <h3>{character.name}</h3>
            <p className="text-red-500 ">{character.location.name}</p>
            <p>{character.origin.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Character;

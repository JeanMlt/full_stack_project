"use client";
import { useState } from 'react';
import DogFactService from './services'; // Importer la classe de services

export default function Home() {
  const [inputValue, setInputValue] = useState<number | string>(""); // État pour stocker la valeur du champ d'écriture
  const [message, setMessage] = useState<string | null>(null);
  const [ErrMessage, setErrMessage] = useState<string | null>(null);

// BUTTON FUNCTIONS LINKED TO THE BACKEND
  const handleGetAll = async() => {
    try {
      const result = await DogFactService.getAll();
      setMessage(result);
      setErrMessage(null);
    } catch (error: any) {
      setErrMessage(error.message);
    }
  };

//-----------------------------------------------------------------------------------------// 

  const handleGet = async() => {
    try {
      const result = await DogFactService.get(inputValue);
      setMessage(result);
      setErrMessage(null);
    } catch (error: any) {
      setErrMessage(error.message);
    }
  };

  //-----------------------------------------------------------------------------------------//

  const handlePost = async () => {
    try {
      const result = await DogFactService.post();
      setMessage(result);
      setErrMessage(null);
    } catch (error: any) {
      setErrMessage(error);
    }
  };

  //-----------------------------------------------------------------------------------------//

  const handlePut = async() => {
    try {
      const result = await DogFactService.put(inputValue);
      setMessage(result);
      setErrMessage(null);
    } catch (error: any) {
      setErrMessage(error.message);
    }
  }

  //-----------------------------------------------------------------------------------------//
  const handleDelete = async() => {
    try {
      const result = await DogFactService.delete(inputValue);
      setMessage(result);
      setErrMessage(null);
    } catch (error: any) {
      setErrMessage(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-5xl font-bold text-center mt-8" >
        MY FIRST APP with next.js :D
      </h1>
      <div className="flex items-center mt-4"> {/* Conteneur pour l'input et le message d'erreur */}
        <input
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="fact id"
          className={`border ${ErrMessage ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 w-full max-w-md`} // Styles de l'input
        />
        {ErrMessage && ( // Affiche le message d'erreur seulement s'il existe
        <div className="text-red-500 ml-4"> {/* Ajout d'un espacement à gauche (ml-4) */}
          {ErrMessage}
        </div>
        )}
      </div>

       <div className="flex space-x-4 mt-4"> {/* Ajout de la marge mt-4 et de l'espace horizontal */}
          <button
            className="bg-blue-800 text-white py-4 px-8 rounded-lg text-lg"
            onClick= {handleGetAll}
          >
            GET ALL
          </button>
          <button
            className={`bg-blue-500 text-white py-4 px-8 rounded-lg text-lg ${!inputValue ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={handleGet}
            disabled={!inputValue}
          >
            GET
          </button>
          <button
            className="bg-green-500 text-white py-4 px-8 rounded-lg text-lg"
            onClick={handlePost}
          >
            POST
          </button>
          <button
            className={`bg-yellow-500 text-white py-4 px-8 rounded-lg text-lg ${!inputValue ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={handlePut}
            disabled={!inputValue}
          >
            PUT
          </button>
          <button
            className={`bg-red-500 text-white py-4 px-8 rounded-lg text-lg ${!inputValue ? "opacity-30 cursor-not-allowed" : ""}`}
            onClick={handleDelete}
            disabled={!inputValue}
          >
            DELETE
          </button>
        </div> 
        {message && (
        <ol className="mt-4 text-lg text-gray-700 list-decimal list-inside">
          {message.split("\n").slice(0, -1).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
         )} 
    </div>
  );
}
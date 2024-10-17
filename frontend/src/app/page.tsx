"use client";
import { useState } from 'react';


export default function Home() {
  const [inputValue, setInputValue] = useState(''); // État pour stocker la valeur du champ d'écriture
  const [message, setMessage] = useState<string | null>(null);
  const [ErrMessage, setErrMessage] = useState<string | null>(null);

// BUTTON FUNCTIONS LINKED TO THE BACKEND
  const handleGetAll = async() => {
    try {
      const response = await fetch(`http://localhost:8000/dog-facts-all`, {method: 'GET'});
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail);
      }
      const result = await response.json();
      setMessage(result);
      setErrMessage(null);
      console.log(result); // Affiche les données récupérées
    } catch (error : any) {
      console.error(error);
      setErrMessage(error.message); 
    }
  };

//-----------------------------------------------------------------------------------------// 

  const handleGet = async() => {
    try {
      const response = await fetch(`http://localhost:8000/dog-facts/${inputValue}`, {method: 'GET'});
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail);
      }
      const result = await response.json();
      setMessage(result);
      setErrMessage(null);
      console.log(result); // Affiche les données récupérées
    } catch (error : any) {
      console.error(error);
      setErrMessage(error.message); 
    }
  };

  //-----------------------------------------------------------------------------------------//

  const handlePost = async () => {
    try {
      const response = await fetch('http://localhost:8000/dog-facts', {method: 'POST'});
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail);
      }
      const result = await response.json();
      setMessage(result);
      console.log(result); // Affiche la réponse après l'envoi
    } catch (error : any) {
      console.error(error);
      setErrMessage(error.message); 
    }
  };

  //-----------------------------------------------------------------------------------------//

  const handlePut = async() => {
    try {
      const response = await fetch(`http://localhost:8000/dog-facts/${inputValue}`, {
        method: 'PUT',
        headers :{'Accept': 'application/json','Content-Type': 'application/json',},
        body: JSON.stringify({test :"test" }),
        }); // 
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail);
      }
      const result = await response.json();
      setMessage(result);
      setErrMessage(null);
      console.log(result); // Affiche la réponse après la mise à jour
    } catch (error : any) {
      console.error(error);
      setErrMessage(error.message); 
    }
  };
  //-----------------------------------------------------------------------------------------//
  const handleDelete = async() => {
    try {
      const response = await fetch(`http://localhost:8000/dog-facts/${inputValue}`, {
        method: 'DELETE',
        headers :{'Accept': 'application/json','Content-Type': 'application/json',},
        });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail);
      }
      const result = await response.json();
      setMessage(result);
      setErrMessage(null);
      console.log(result); // Affiche la réponse après la mise à jour
    } catch (error : any) {
      console.error(error);
      setErrMessage(error.message); 
    }
  };
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
import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [char, setChar] = useState(false);
  const [num, setNum] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    if (num) str += "0123456789";
    if (char) str += "@#$%^&*()_+;<=>?@[]{";
    for (let i = 0; i < length; i++) {
      let randomChar = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomChar);
    }
    setPassword(pass);
  }, [length, char, num]);

  useEffect(() => {
    passwordGenerator();
  }, [length, char, num]);

  const passwordRef = useRef(null);
  const copyHandler = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    
  }, [password]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-200" >
  
  <div className="flex flex-col items-center mt-10">
    <div className="flex flex-col items-center rounded-md w-[500px] bg-gray-800 p-6">
      <button onClick={passwordGenerator} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate other Password</button>
      <div className="mt-4 flex items-center">
        <input ref={passwordRef} type="text" value={password} readOnly className="border border-gray-400 p-2 rounded-md w-80" />
        <button onClick={copyHandler} className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">Copy</button>
      </div>
      <div className="mt-4 flex items-center">
        <input type="range" value={length} min={8} max={30} onChange={(e) => { setLength(e.target.value) }} className="cursor-pointer border border-gray-400 p-2 rounded-md mr-2" />
        <label htmlFor="" className="mr-2 text-white">Length: {length}</label>
        <input type="checkbox" checked={num} onChange={() => { setNum(prev => !prev) }} className="mr-2" />
        <label htmlFor="" className="mr-2 text-white">Numbers</label>
        <input type="checkbox" checked={char} onChange={() => { setChar(prev => !prev) }} className="mr-2" />
        <label htmlFor="" className='text-white'>Characters</label>
      </div>
    </div>
  </div>
</div>

  );
}

export default App;

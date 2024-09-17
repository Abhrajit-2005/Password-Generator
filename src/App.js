import './App.css';
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberAllowed] = useState(true);
  const [characterallowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [letterallowed, setLetterAllowed] = useState(true);

  // useCallback to prevent re-rendering when the state changes or is a React Hook that lets you cache a function definition between re-renders.
  // useEffect is a React Hook that lets you synchronize a component with an external system.
  // useRef is a React Hook that lets you reference a value that’s not needed for rendering. Generally used to refer a DOM Element.
  // useState is a React Hook that lets you add state to a functional component.
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let password = "";
    let pqr = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numberList = "0123456789";
    const characterList = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    for (let i = 0; i < length; i++) {
      if(letterallowed){
        pqr += str;
      }
      if (numberallowed) {
        pqr += numberList;
      }
      if (characterallowed) {
        pqr += characterList;
      }
    }
    for (let i = 0; i < length; i++) {
      password += pqr.charAt(Math.floor(Math.random() * pqr.length));
    }
    setPassword(password);
  }, [length, numberallowed, characterallowed, letterallowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword()
  }, [length, numberallowed, characterallowed, letterallowed, generatePassword]);

  return (
    <>
      <div className="my-50 w-auto max-w-3xl mx-auto shadow-md rounded-lg px-7 py-7 my-10 bg-blue-950 text-blue-300 font-mono font-semibold rounded-l-lg">
        <h1 className='text-blue-200 text-center my-3 mb-5 font-bold font-mono font-extrabold text-4xl'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-7">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-blue-950 font-mono font-semibold rounded-l-lg text-xl"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className='outline-none bg-slate-950 text-blue-300 px-3 py-0.5 shrink-0 text-2xl font-semibold rounded-r-lg'
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-xl mr-6'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={letterallowed}
              id="letterInput"
              onChange={() => {
                setLetterAllowed((prev) => !prev);
              }}
            />
            <label className='text-xl mr-3'>Letters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className='text-xl mr-3'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterallowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput" className='text-xl mr-3'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

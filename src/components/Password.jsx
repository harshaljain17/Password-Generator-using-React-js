import React, { useCallback, useEffect, useRef, useState } from 'react'

function Password() {
  const [length, setLength] = useState(6)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const inputRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let lowercase = "abcdefghijklmnopqrstuvwxyz"
    let numbers = '1234567890'
    let symbols = "!@#$%^&*"
    let str = ""

    if (includeLowercase) { str += lowercase }
    if (includeNumbers) { str += numbers }
    if (includeUppercase) { str += uppercase }
    if (includeSymbols) { str += symbols }

    let pass = ""
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, includeLowercase, includeNumbers, includeSymbols, includeUppercase])

  useEffect(() => {
    PasswordGenerator()
  }, [length, includeLowercase, includeNumbers, includeSymbols, includeUppercase])

  const copyToClipboard = useCallback(() => {
    inputRef.current?.select();
    if (password) {
      window.navigator.clipboard.writeText(password);
    }
  }, [password])

  return (
    <div className="h-screen w-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(https://plus.unsplash.com/premium_photo-1667587245819-2bea7a93e7a1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)` }}>
      <div className="w-full max-w-md rounded-[2.5rem] border border-white/40 bg-white/10 p-10 shadow-2xl backdrop-blur-md">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Password generator</h1>
          <p className="mt-1 text-sm text-gray-500">Generate strong unique passwords</p>
        </div>

        <div className="mb-8 rounded-3xl bg-gray-100/60 p-5">
          <div className="flex items-center justify-between">
            <input
              ref={inputRef}
              type="text"
              value={password}
              readOnly
              className="w-full bg-transparent border-none focus:outline-none"
              placeholder="Generated password" />
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="rounded-xl bg-gray-900 p-2.5 text-white hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
              </button>
              <button
                onClick={PasswordGenerator}
                className="rounded-xl bg-gray-900 p-2.5 text-white hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm font-bold text-gray-700 mb-3">
              <span>Password length</span>
              <span>{length}</span>
            </div>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 accent-gray-900" />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Include Uppercase Letters</span>
              <input
                type="checkbox"
                onClick={() => setIncludeUppercase(!includeUppercase)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-gray-900 focus:ring-gray-500" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Include Lowercase Letters</span>
              <input
                type="checkbox"
                onClick={() => setIncludeLowercase(!includeLowercase)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-gray-900 focus:ring-gray-500" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Include Numbers</span>
              <input type="checkbox"
                onClick={() => setIncludeNumbers(!includeNumbers)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-gray-900 focus:ring-gray-500" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Include Symbols</span>
              <input type="checkbox"
                onClick={() => setIncludeSymbols(!includeSymbols)}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-gray-900 focus:ring-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Password
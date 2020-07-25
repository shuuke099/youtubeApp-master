import React,{createContext , useEffect} from 'react'
export const reactionContext = createContext()
const reactionContextProvider = ({children}) => {
  return (
    <div>
      <reactionContext.Provider value={{}}>{children}</reactionContext.Provider>
    </div>
  )
}

export default reactionContextProvider

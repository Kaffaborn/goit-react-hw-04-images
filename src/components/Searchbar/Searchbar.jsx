import { useState } from 'react'

import SearchCSS from './Searchbar.module.css'

export function Searchbar ({search}) {
    const [input, setInput] = useState({inputValue: "", prevInputValue: "запит"})

    const inputChange = ({target: {value}}) => {
        setInput((prev) => {return{...prev, inputValue: value.toLowerCase()}})
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        const value = input.inputValue.trim()
        if(!value) {
            alert("Ввадіть запит")
            return
        }

        if(input.prevInputValue === input.inputValue){
          alert(`Ви ввели запит "${this.state.prevInputValue}" повторно`)
          return
        }

        setInput((prev) => {return{...prev, prevInputValue: value}})
        search(input.inputValue)
    }

    return <header className={SearchCSS.Searchbar}>
    <form className={SearchCSS.SearchForm} onSubmit={searchSubmit}>
      <button type="submit" className={SearchCSS.SearchFormButton}>
        <span className={SearchCSS.SearchFormButtonLabel}>Search</span>
      </button>
  
      <input
        className={SearchCSS.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        onChange={inputChange}
        value={input.inputValue}
        placeholder="Search images and photos"
      />
    </form>
  </header>
  
}

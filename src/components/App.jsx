import { useEffect, useState } from 'react';

import {getImage} from '../api/getImage'
import {Searchbar} from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";



export function App () {
  const [search, setSearch] = useState({
    search: "",
    page: 1
  })


  const [imageBase, setImageBase] = useState({
    imageBase: [],
    total: 0,

  })

  const [dataModal, setDataModal] = useState({
    modal: false,
    imageModal: "",
    tagModal: "",
  })


  const [load, setLoad] = useState(false)

  useEffect(()=>{
    if(search.search !== "") {
      setLoad(true)
      getImage({query: search.search, page: search.page})
              .then(response =>{
  
                  if(response.total === 0) {
                      alert(`Нажаль за запитом "${search.search}" нічого не знайдено`)
                  } else if (search.page === 1) {
                    setImageBase({
                      total: response.total,
                      imageBase: response.hits,
                    })     
                  } else if (search.page !== 1) {
                    setImageBase((prev) => {
                      return{
                      ...prev,
                      imageBase: [...prev.imageBase, ...response.hits]
                      }
                    })
                  }
              })
              .catch(console.log)
              .finally(()=>{
                return setTimeout(() => {
                    setLoad(false)
                  }, 250);   
              })
    }},[search])

  const openModal = (imageModal, tagModal) => {
    setDataModal({
      modal: true,
      imageModal,
      tagModal
    })} 

  const closeModal = () => {
    setDataModal({modal: false})
  }
  
  const searchQuery = (value) => {
    setSearch((prev)=>{return{
      ...prev,
      search: value,
      page: 1,
    }})
  }

  const addMore = () => {
    setSearch((prev) => {return{
      ...prev,
      page: prev.page + 1
    }})
  }

  
    return <>
      {dataModal.modal && <Modal imageModal={dataModal.imageModal} tagModal={dataModal.tagModal} closeModal={closeModal}/>}

      <Searchbar search={searchQuery}/>
      <ImageGallery addMore={addMore} openModal={openModal} imageBase={imageBase.imageBase} total={imageBase.total} load={load}/>
      {search.search === "" && <h2 style={{alignItems: 'center', textAlign: 'center'}}>Ведіть будьласка запит</h2>}

      </>

};



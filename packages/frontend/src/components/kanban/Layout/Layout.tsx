import React from 'react'
import MainContainer from '../MainContainer/MainContainer'
import DeleteTaskModal from '../Modals/DeleteTaskModal'

const Layout = () => {
  const [openConfirmation, setOpenConfirmation] = React.useState(false)
 
  const handleOpenConfirm = () => {
    setOpenConfirmation(true)
  }

  const handleOpen = () => {
    const modal = document.getElementById("taskModal")
    if(modal instanceof HTMLDialogElement){
      modal.showModal()
    }
  }
  
  const handleCloseConfirm = () => {
    setOpenConfirmation(false)
  }

 
  return (
    <>
        <main className='w-full h-main-mobile md:h-main-tablet lg:h-main-desk z-0 relative  font-bold text-lightText dark:text-darkText flex'>
            <MainContainer handleOpenConfirm={handleOpenConfirm}/>
        </main>
        {openConfirmation && <DeleteTaskModal onOpen={handleOpen} onClose={handleCloseConfirm}/>}

    </>
  )
}

export default Layout

import React, { useEffect, useState } from 'react'
import { addRecette ,deleteRecetteById , updateRecette , getRecettesByUser } from '../actions/patients'
import { useDispatch, useSelector } from 'react-redux'
import PageIcon from '../components/PageIcon'
import { BsHeartPulseFill } from 'react-icons/bs'
import { Modal, Radio } from 'antd'
import { MdAdd } from 'react-icons/md'
import CustomInput from '../components/CustomInput'
import Swal from 'sweetalert2'
import {  getUserFromJWT } from '../utils/User';
import { useNavigate } from 'react-router-dom'
import TableRecette from '../components/TableRecette'
import { deleteRecetteByID } from '../api'

function Home() {
  const navigate = useNavigate();
  const user = getUserFromJWT()
  const dispatch = useDispatch()
  const handledeletePatient = (id) => {
    Swal.fire({
      title: "Vous voulez Poursuivre l'operation?",
      // showDenyButton: true,
      icon : "warning",
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRecetteByID(id))
      }
    })
    
  }

  const handleUpdatePatient = (recette) => {
  
    setCurrentID(recette?.id)
    setAddFlag(false)
    setOpen(true)
    setFormData((prevFormData) => ({
      ...prevFormData,
      nom: recette.nom, 
      prenom: recette.prenom, 
      age: recette.age, 
      adresse: recette.adresse,
    }));
  }
  useEffect(() => {
    if (user) {
    dispatch(getRecettesByUser())

    }
    else navigate('/auth')
  }, [dispatch])

  const { recettes, isLoading } = useSelector((state) => state.recetteReducers);


  const [open, setOpen] = useState(false);
  const [isAddFlag, setAddFlag] = useState(true);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentID, setCurrentID] = useState(0) // for updating the patient

  const initialFormState = {
    nom: "", etapes:[], age: 0, duree : "", photo: "", ingredients : []

  }

  const initialFormStateError = {
    nomError: false, prenomError: false, ageError: false
  }
  const [formData, setFormData] = useState(initialFormState);
  const [formDataError, setFormDataError] = useState(initialFormStateError);
  const showModal = () => {
    setAddFlag(true)
    setOpen(true);
  };

  const clearFormDataErrors = () => {
    //clear the errorState :
    setFormDataError((prevFormDataErr) => ({
      ...prevFormDataErr,
      nomError: false, prenomError: false, ageError: false
    }))
  }

  const handleOk = () => {
    // check the fiels 
    if (!formData.nom) {
      setFormDataError((prevFormDataErr) => ({
        ...prevFormDataErr,
        nomError: true
      }))
    }
    else if (!formData.prenom) {
      setFormDataError((prevFormDataErr) => ({
        ...prevFormDataErr,
        prenomError: true
      }))
    }
    else if (!formData.age) {
      setFormDataError((prevFormDataErr) => ({
        ...prevFormDataErr,
        ageError: true
      }))
    }
    else {
      setConfirmLoading(true);
      // setTimeout(() => {
      //   setOpen(false);
      //   setConfirmLoading(false);
      // }, 2000);
      const {nom,age,adresse,prenom,sexe,telephone} = formData
      if (isAddFlag) {
        // dispatch(addPatient({nom,age,adresse,prenom,sexe,telephone, profil: formData?.files[0]?.thumbUrl}))
      }
      else {
        // dispatch(updatePatient({nom,age,adresse,prenom,sexe,telephone, profil: formData?.files[0]?.thumbUrl,id :currentID})) // update dispatch
      }
      setConfirmLoading(false);
      setOpen(false)

      //clear formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        nom: "", prenom: "", age: 0, adresse: "", telephone: "", sexe: "M"
      }));

      //clear the errorState :
      clearFormDataErrors()
    }
  };
  const handleCancel = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nom: "", prenom: "", age: 0, adresse: "", telephone: "", sexe: "M",
    }));
    setOpen(false);
    clearFormDataErrors()
    handleRemoveFile()
  };

  const handleRemoveFile = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: [],
    }));
  }

    const handleFormChange = (event) => {
      console.log(formData)
      let { name, value } = event.target;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      // managing () display & hide )errorMessage  while the formstates are changing
      if (name === "nom") {
        setFormDataError((prevFormDataErr) => ({
          ...prevFormDataErr,
          nomError: false
        }))
      }
      else if (name === "prenom") {
        setFormDataError((prevFormDataErr) => ({
          ...prevFormDataErr,
          prenomError: false
        }))
      }
      else if (name === "age") {
        setFormDataError((prevFormDataErr) => ({
          ...prevFormDataErr,
          ageError: false
        }))
      }

    }

    return (
      <div className='bg-slate-200 '>
        {/* <div className='md:w-[600px] lg:w-[720px] xl:w-full'> */}
        <div className='mb-10 flex flex-row justify-between items-center'>
          <PageIcon icon={<BsHeartPulseFill />} />
          <button className='flex flex-row items-center justify-between text-sm text-white bg-[#0069e9] hover:bg-[#519efb] p-1.5 px-2.5 rounded-md' onClick={showModal}  >
            <MdAdd className='' />
            <span>Ajouter</span>
          </button>
        </div>

        <Modal
          width={1000}
          title={`${isAddFlag ? "Ajouter" : "Modifier"} un patient`}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{
            className: "bg-[#0069e9] hover:bg-[#519efb]"
          }}
          cancelButtonProps={{
            // disabled: true,
          }}
        >
          <div className='grid grid-cols-2 gap-6 max-sm:grid-cols-1 mt-4 items-center'>
            <CustomInput type="text" placeholder="Nom *" name="nom" value={formData.nom} onChange={handleFormChange} isError={formDataError.nomError} messageError='nom est requis' />
            <CustomInput type="text" placeholder="Prenom *" name="prenom" value={formData.prenom} onChange={handleFormChange} isError={formDataError.prenomError} messageError='prenom est requis' />
            <CustomInput type="number" placeholder="Age" name="age" max={150} min={0} value={formData.age} onChange={handleFormChange} isError={formDataError.ageError} messageError='age est requis' />
            <CustomInput type="text" placeholder="Telephone *" name="telephone" value={formData.telephone} onChange={handleFormChange} />
            <CustomInput type="text" placeholder="Adresse" name="adresse" value={formData.adresse} onChange={handleFormChange} />
            <Radio.Group name='sexe' onChange={handleFormChange} value={formData.sexe} >
              <Radio value="M">Homme</Radio>
              <Radio value="F">Femme</Radio>
            </Radio.Group>
           

          </div>
        </Modal>

        <TableRecette data={recettes} isLoading={isLoading} handledeletePatient={handledeletePatient} handleUpdatePatient={handleUpdatePatient} />
      </div>
    )
  }

  export default Home
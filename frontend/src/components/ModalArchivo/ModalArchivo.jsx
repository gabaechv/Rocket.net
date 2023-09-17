import React from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaFileUpload } from "react-icons/fa";
import "./ModalArchivo.css";

function ModalArchivo({estado, cambiarEstado, subir}) {
const [formData, setFormData] = useState({});
const fileInputRef = useRef(null);
const [file, setFile] = useState();
const [titulo, setTitulo] = useState("");
const [descripcion, setDescripcion] = useState("")

const handleFile=(event)=> {
    setFile(event.target.files[0])
    setTitulo(event.target.files[0].name) //para obtener el nombre del archivo y guardarlos en el estado titulo (setTitulo)
    console.log(event.target.files[0])
}


const handleSubmit = (e) => {
    e.preventDefault();
  
    const newFormData = { ...formData, id: uuidv4(), tituloarchivo: titulo,  
    descripcionarchivo: descripcion,  idusuario: "id_usuario", // aca estan almacenado la data del modal
    }; 
    
    subir(newFormData); 
    setDescripcion("");
    setTitulo("");
    cambiarEstado(false);
    console.log('prueba de almacenamiento', newFormData); // para ver si se estan almacenando los datos
    
}

const handleFileInputClick = () =>{
    fileInputRef.current.click();
}

    return (
        <>
        {estado &&
        <div className="contenedor-archivos">
        <div className="contenedor-formulario">
        <div className="contenedor-cerrar-archivo">
            <button
                className="cerrar-archivo"
                onClick={() => cambiarEstado(!estado)}
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16">
                <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
                </svg>
            </button>
        </div>
        <div className="titulo-modal-archivo">
        <h1>Agregar un nuevo archivo</h1>
        </div>
        <div className="caja">
        <input className="subir-archivo" type="file" name="archivo" hidden ref={fileInputRef} onChange={handleFile}/>
        <h1>Haz click aca para subir el archivo</h1>
        <FaFileUpload className="icon-subir" onClick={handleFileInputClick}/>
        <h2>Explora tu carpeta y carga tu archivo</h2>
        </div>
        <div className="contenedor-campos">
            <form className = "formulario-style" onSubmit={handleSubmit}>
            <label className = "nombre-archivo">Titulo del archivo</label>
            <input className="input-archivo" id="nombre" onChange={(e) => setTitulo(e.target.value)} value={titulo}></input>
            <label className = "descripcion-archivo">Descripcion del archivo</label>
            <input className="input-archivo" onChange={(e) => setDescripcion(e.target.value)}></input>
            </form>
        </div>
        <div className="contenedor-botones-archivos">
        <button className="boton-subir" onClick={handleSubmit}>Subir</button>
        <button className="boton-cancelar" onClick={() => cambiarEstado(!estado)}>Cancelar </button>
        </div>
        </div>
        </div>
        }
    </>
 );
}

export default ModalArchivo;
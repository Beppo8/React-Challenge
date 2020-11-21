import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

function App() {

  const dataCursos = [
    { id: 1, nombre: "Curso EdGrid", poster: "https://ed.team/cursos/flexbox-grid", descripcion: 'Curso', precio: 35, disponible: true}
  ];

  const [data, setData] = useState(dataCursos);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);


  const [cursoSeleccionado, setcursoSeleccionado] = useEffect({
    id: '',
    nombre: '',
    poster: '',
    descripcion: '',
    precio: '',
    disponible: true,
  });

  const seleccionarCurso=(elemento, caso)=>{
setcursoSeleccionado(elemento);
(caso==='Editar')?setModalEditar(true):setModalEliminar(true)
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setcursoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }));
  }

  const editar=()=>{
    var dataNueva=data;
    dataNueva.map(curso=>{
      if(curso.id===cursoSeleccionado.id){
        curso.minutos=cursoSeleccionado.minutos;
        curso.poster=cursoSeleccionado.poster;
        curso.descripcion=cursoSeleccionado.descripcion;
        curso.precio=cursoSeleccionado.precio;
        curso.disponible=cursoSeleccionado.disponible;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar =()=>{
    setData(data.filter(curso=>curso.id!==cursoSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar=()=>{
    setcursoSeleccionado(null);
    setModalInsertar(true);
  }

  const insertar =()=>{
    var valorInsertar=cursoSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2 className="Header-title">Cursos EdTeam</h2>
      <br />
    <button className="btn btn-success" onClick={()=>abrirModalInsertar()}>Crear Curso</button>
    <br /><br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Poster (URL)</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>
                <a href={elemento.poster}>{elemento.poster}</a>
              </td>
              <td>{elemento.descripcion}</td>
              <td>{elemento.precio}</td>
              <td>
                {elemento.disponible ? 'Si' : 'No'}
              </td>
              <td><button className="btn btn-primary" onClick={()=>seleccionarCurso(elemento, 'Editar')}>Editar</button> {"   "}
              <button className="btn btn-danger" onClick={()=>seleccionarCurso(elemento, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3><Edi></Edi>tar Curso</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={cursoSeleccionado && cursoSeleccionado.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={cursoSeleccionado && cursoSeleccionado.nombre}
              onChange={handleChange}
            />
            <br />

            <label>Poster (URL)</label>
            <input
              className="form-control"
              type="text"
              name="poster"
              value={cursoSeleccionado && cursoSeleccionado.poster}
              onChange={handleChange}
            />
            <br />
            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={cursoSeleccionado && cursoSeleccionado.descripcion}
              onChange={handleChange}
            />
            <br />
            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={cursoSeleccionado && cursoSeleccionado.precio}
              onChange={handleChange}
            />
            <br />
            <label>Disponible</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="disponible"
              value={cursoSeleccionado && cursoSeleccionado.disponible}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el curso {cursoSeleccionado && cursoSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Curso</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />
            <br />

            <label>Nombre Curso</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={cursoSeleccionado ? cursoSeleccionado.nombre: ''}
              onChange={handleChange}
            />
            <br />

            <label>Poster(URL)</label>
            <input
              className="form-control"
              type="text"
              name="poster"
              value={cursoSeleccionado ? cursoSeleccionado.poster: ''}
              onChange={handleChange}
            />
            <br />

            <label>Descripcion</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              value={cursoSeleccionado ? cursoSeleccionado.descripcion: ''}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="text"
              name="precio"
              value={cursoSeleccionado ? cursoSeleccionado.precio: ''}
              onChange={handleChange}
            />
            <br />

            <label>Disponible</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="disponible"
              value={cursoSeleccionado ? cursoSeleccionado.disponible: 'Si'}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;

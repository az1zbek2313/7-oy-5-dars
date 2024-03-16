import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const [update, setUpdate] = useState('');
    const [retur, setReturn] = useState(false)
    const name = useRef();
    const age = useRef();
    const desc = useRef();
    const editName = useRef();
    const editAge = useRef();
    const editDesc = useRef();
    let counter = 1;
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    function validate(name, age) {
        if (!name.current.value) {
            alert('Enter name!') 
           name.current.focus();
           return false
        }
        if (!Number(age.current.value)) {
           age.current.focus();
           alert('Enter age !') 
           return false
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate(name, age);
        if (isValid) {
            let user =  {
                id: nanoid(),
                name:name.current.value,
                age:age.current.value,
                desc:desc.current.value
            }
            dispatch({type: 'ADD', payload: user})
            name.current.value = '';
            age.current.value = '';
            desc.current.value = '';
        }

        console.log(users);
    }

    function handleDelete(user) {
        const isConfirm = confirm("Rostdan ham o'chirmoqchimisiz");
      if (isConfirm) {
        dispatch({type: 'DELETE', payload: user})
      }
    }


    function handleEdit() {
        let avatar = {
            id:update.id,
            name:editName.current.value == '' ? update.name : editName.current.value,
            age: editAge.current.value == '' ? update.age : editAge.current.value,
            desc:editDesc.current.value == '' ? update.desc : editDesc.current.value
        }
        dispatch({type: 'EDIT', payload:avatar})
        editName.current.value = ''
        editAge.current.value = ''
        editDesc.current.value = ''
        setReturn(false)
    }

    function handleUpdate(user) {
        setUpdate(user);
        setReturn(true)
    }


  return (
    <div className='w-50 mx-auto'>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Name</label>
                    <input ref={editName} type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Age</label>
                    <input ref={editAge} type="number" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Description</label>
                    <input ref={editDesc} type="text" className="form-control" id="recipient-name" />
                </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={handleEdit} type="button" className="btn btn-primary" data-bs-dismiss={retur ? `modal`:''}>Edit</button>
            </div>
            </div>
        </div>
        </div>

         <form className='mb-4' onSubmit={handleSubmit}>
                <h1 className='text-center'>Users</h1>
                <div className="form-floating mb-3">
                    <input ref={name} type="text" className="form-control" id="floatingInput" placeholder="Name" />
                    <label htmlFor="floatingInput">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input ref={age} type="number" className="form-control" id="floatingInput" placeholder="Author" />
                    <label htmlFor="floatingInput">Age</label>
                </div>

                <div className="form-floating">
                    <textarea ref={desc} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea">Comments</label>
                </div>
                
                <button className='btn btn-primary w-100 mt-3 fs-5'>Add user</button>
            </form>

            <table className={`table table-striped `}>
                <thead>
                    <tr className='w-100'>
                        <th className='th text-center'>N%</th>
                        <th className='th text-center'>Name</th>
                        <th className='th w-25 text-center'>Age</th>
                        <th className='th w-25 text-center'>Description</th>
                        <th className='th w-25 text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    users.length > 0 &&
                    users.map((el, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center'>{index+1}</td>
                                <td className='text-center'>{el.name}</td>
                                <td className='text-center'>{el.age}</td>
                                <td className='text-center'>{el.desc}</td>
                                <td className='text-center'>
                                    <i onClick={() => {handleDelete(el)}} className="fa-solid fa-trash mx-1" style={{cursor:'pointer'}}></i>
                                    <i onClick={() => {handleUpdate(el)}} className="fa-regular fa-pen-to-square mx-1" style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"></i>
                                </td>
                            </tr>
                        )
                    })
                  }                   
                </tbody>
            </table>
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

function UpdateUser(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [deleteavatar, setDeleteavatar] = useState('');
    const [avatar, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const {id} = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getData = async()=>{
        try{
            const response = await axios.get(`http://localhost:8080/getinfo/${id}`,{
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUsername(response.data.username);
            setPassword(response.data.password);
            setEmail(response.data.email);
            setRole(response.data.role);
        }catch(error){
            setError("Не удалось получить данные");
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div style={{ width: '600px', height: '550px' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Обновление данных</h2>
                    {error && <p className="text-danger">{error}</p>}
                    {error ==="" &&
                    <>
                    <p>Имя пользователя</p>
                    <MDBInput wrapperClass='mb-3' id='fullName' placeholder={"Имя пользователя"} value={username} type='text'
                              /*onChange={(e) => setUsername(e.target.value)}*/ />
                    <p>Адрес электронной почты</p>
                    <MDBInput wrapperClass='mb-3' placeholder='Адрес электронной почты' id='email' value={email} type='email'
                              /*onChange={(e) => setEmail(e.target.value)}*/ />
                    <p>Пароль</p>
                    <MDBInput wrapperClass='mb-3' placeholder='Пароль' id='password' type='password' value={password}
                              /*onChange={(e) => setPassword(e.target.value)}*/ />
                    <p>Роль</p>
                    <select
                        className="form-select mb-3"
                        value={role || ''}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="USER">USER</option>
                        <option value="MODER">MODER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <p>Аватар</p>
                    <MDBInput wrapperClass='mb-3' type='file' accept='image/*' id='avatar' /*onChange={(e) => setPhoto(e.target.files[0])}*/ />
                    <MDBCheckbox
                        wrapperClass='mb-3'
                        id="deleteavatarcheckbox"
                        label = "Удалить аватар"
                    />
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{ height: '40px', width: '100%' }}
                            /*onClick={handleSignup}*/>Сохранить   
                    </button>
                    </>
            }
                </MDBContainer>
            </div>
        </div>
    );
}

export default UpdateUser;
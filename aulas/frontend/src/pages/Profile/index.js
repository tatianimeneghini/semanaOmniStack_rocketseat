import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Profile(){
    const [incident, setIncident] = useState([]);

    const ongName = localStorage.getItem("ongName");
    const ongId = localStorage.getItem("ongId");
    const history = useHistory();

    useEffect(() => {
        api.get("profile", {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncident(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncident(incident.filter(incident => incident.id !== id));
        }catch (err){
            console.log(err);
            alert("Erro ao deletar caso, tente  novamente.")
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, APAD</span>
                
                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={handleLogout} size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incident.map(incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>
                    
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>
                    
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat("pt-BR", { 
                            style: "currency", 
                            currency: "BRL"}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}           
            </ul>
        </div>
    )
}
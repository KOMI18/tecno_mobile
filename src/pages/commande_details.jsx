import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Commande_details = () => {
    const idObject = useParams()
    const id = idObject['id']
    console.log('id', id);
    useEffect(()=>{
        const fetch = async () => {
            const response = await axios.get('http://172.20.10.6:3001/commande/dataById')
        }
    })
    return(
        <div>
           
        </div>
    )
}
export default Commande_details ;
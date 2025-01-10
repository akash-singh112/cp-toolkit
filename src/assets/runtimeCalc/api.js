import axios from 'axios'

const api_url = 'http://localhost:8800';

export const getExecutionTime = async (codeText,inputText) =>{
    try {
        const payload = {codeText,inputText};
        const response = await axios.post(`${api_url}/exec-time`,payload);
        return response;
    } catch (error) {
        console.error('Error linking API from FE to BE \'api_link_exec-time\'',error);
    }
};
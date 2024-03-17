import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Index = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/v2')
    }, []);
    return (
        <div>
            
        </div>
    );
}

export default Index;

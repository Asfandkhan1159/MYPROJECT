import React,{useState, useEffect} from 'react';
const useGoogleMapsApiKey = () => {
    const [apiKey, setApiKey] = useState(null);
  
    useEffect(() => {
      const fetchApiKey = async () => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        setApiKey(apiKey);
      };
  
      fetchApiKey();
    }, []);
  
    return apiKey;
  };
 
  export default useGoogleMapsApiKey;
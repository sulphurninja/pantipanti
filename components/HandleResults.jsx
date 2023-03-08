import React, { useState } from 'react'

function HandleResults(){
  const [loading, setLoading] = useState(false);

  async function handleGenerateResults(){
    setLoading(true);
    const response = await fetch('/api/generateResults');
    const data = await response.json();
    console.log(data.message);
    setLoading(false);
  };

  

  return (
    <div className='text-black font-bold '>
      <button onClick={handleGenerateResults} className='bg-green-200 h-[50px] w-[200px]   ml-[20px] rounded-lg' disabled={loading}>
        {loading ? 'Generating...' : 'Generate Results'}
      </button>
    </div>
  );
}

export default HandleResults
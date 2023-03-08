export default function Amount() {
    const amts = Array.from({ length: 6 }, (_, i) => `${i+1}.png`);
  
    const handleBetClick = (betId) => {
      console.log(`Placing bet with ID ${betId}`);
      
    };
    return (
      <div className="flex justify-between w-full h-full">
        {amts.map((amt, i) => (
          <button
            key={i}
            onClick={() => handleBetClick(i)}
          >
            <img src={`/Amount/${amt}`} className="w-full h-full rounded-full" alt={amt} />
          </button>
        ))}
      </div>
    );
  }
  
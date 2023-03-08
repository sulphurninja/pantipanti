import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Generate the list of draw times
  const startHour = 1;
  const startMinute = 0;
  const interval = 5;
  const numDraws = 288;

  const drawTimes = [];
  for (let hour = startHour; hour <= 12; hour++) {
    for (let minute = startMinute; minute < 60; minute += interval) {
      drawTimes.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} AM`);
      drawTimes.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} PM`);
    }
  }

  // Generate and write the documents to results.json
  const docs = [];
  for (let i = 0; i < numDraws; i++) {
    const doc = {
      couponNum: Math.floor(Math.random() *10) ,
      drawTime: drawTimes[i]
    };
    docs.push(doc);
  }

  const jsonData = JSON.stringify(docs, null, 2);

  const resultsPath = path.join(process.cwd(), 'data', 'results.json');

  try {
    fs.writeFileSync(resultsPath, jsonData, 'utf-8');
    console.log('Results written to file successfully');
    res.status(200).json({ message: 'Results written to file successfully' });
  } catch (err) {
    console.log('Error writing to file:', err);
    res.status(500).json({ message: 'Error writing to file' });
  }
}

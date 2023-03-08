import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    // Read the data from results.json
    const dataPath = path.join(process.cwd(), 'data', 'results.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const results = JSON.parse(jsonData);

    // Find the result for the given drawTime
    const { drawTime } = req.query;
    const result = results.find((r) => r.drawTime === drawTime);

    if (!result) {
      res.status(404).json({ message: 'Result not found' });
    } else {
      res.status(200).json({ couponNum: result.couponNum });
    }
  } catch (err) {
    console.log('Error reading file:', err);
    res.status(500).json({ message: 'Error reading file' });
  }
}

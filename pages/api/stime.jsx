import moment from 'moment-timezone';

const MUMBAI_TIMEZONE = 'Asia/Kolkata';

export default function handler(req, res) {
  const now = moment().tz(MUMBAI_TIMEZONE);
  const formattedTime = now.format('hh:mm:ss A');
  console.log('Fetched time:', formattedTime);
  res.json({ now: formattedTime });
}

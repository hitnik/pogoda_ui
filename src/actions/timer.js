const calculateTimeLeft = (dateString) => {
  const difference = new Date(parseInt(dateString)) -Date.now();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
};

const calculateTimeLeftSeconds = (dateString) =>{
  const difference = new Date(parseInt(dateString)) -Date.now();
  if (Math.floor(difference / 1000) > 0) return Math.floor(difference / 1000);
  return 0;
}

export {calculateTimeLeftSeconds}

export default calculateTimeLeft;
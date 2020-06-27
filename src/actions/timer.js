const calculateTimeLeft = (dateString) => {
  const difference = +new Date(dateString) - +Date.now();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

export default calculateTimeLeft;
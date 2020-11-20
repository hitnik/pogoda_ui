const compareForumsData = (a, b) => {
    if (a.count > 0 && b.count > 0 && a.id < b.id) {
      return -1;
    }
    if (a.count > 0 && b.count > 0 && a.id > b.id ) {
      return 1;
    }
    if (a.count > 0 && b.count > 0 && a.id === b.id ) {
        return 0;
    }
    if (a.count == 0 && b.count > 0 ) {
        return 1;
    }
    if (a.count > 0 && b.count === 0 ) {
        return -1;
    }
    if (a.count === 0 && b.count === 0 && a.id > b.id ) {
        return 1;
    }
    if (a.count === 0 && b.count === 0 && a.id < b.id) {
        return -1;
      }
    return 0;
  }


const convertDateToLocalIso = (isoDate) =>{
  const localDate = new Date(isoDate);
  return localDate.getFullYear()+'-'+(localDate.getMonth()+1)+'-'+localDate.getDate()
}  


const convertDateToLocalRu = (isoDate) =>{
  const localDate = new Date(isoDate);
  var options = { year: 'numeric', month: 'numeric', day: 'numeric'};
  return localDate.toLocaleDateString('ru-Ru', options)
}  

const yesterday = () =>{
  let date = new Date();
  date = new Date(date.setDate(date.getDate() - 1));
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
  }

const convertDateToTopic = (isoDate)=> {
  const localDate = new Date(isoDate);
  var options = {hour:'numeric', minute:'numeric', day: 'numeric',  month: 'long', year: 'numeric'};
  return localDate.toLocaleTimeString('ru-Ru', options)
}

const dateDecrement = (date) =>{
  let localDate = new Date(date);
  localDate = new Date(localDate.setDate(localDate.getDate() - 1));
  return localDate.getFullYear() + '-' + (localDate.getMonth()+1) + '-' + localDate.getDate()
}

const dateIncrement = (date) =>{
  let localDate = new Date(date);
  localDate = new Date(localDate.setDate(localDate.getDate() + 1));
  return localDate.getFullYear() + '-' + (localDate.getMonth()+1) + '-' + localDate.getDate()
}

const isYearPassed = (date) => {
  let localDate = new Date(date);
  let yearAgo = new Date(new Date().getFullYear(), new Date().getMonth(), 
                            new Date().getDate(), localDate.getHours(), 
                            localDate.getMinutes(), localDate.getSeconds(),
                            localDate.getMilliseconds() 
                            );
  yearAgo = new Date(yearAgo.setFullYear(yearAgo.getFullYear() - 1));
  return localDate <= yearAgo
}

const isTommorow = (date) =>{
  let localDate = new Date(date);
  let tommorow = new Date(new Date().getFullYear(), new Date().getMonth(), 
                          new Date().getDate(), localDate.getHours(), 
                          localDate.getMinutes(), localDate.getSeconds(),
                          localDate.getMilliseconds() 
                          );
  tommorow = new Date(tommorow.setDate(tommorow.getDate() + 1));
  return localDate >= tommorow
}

export {compareForumsData, convertDateToLocalIso,
        convertDateToLocalRu, yesterday,
        convertDateToTopic, dateDecrement, dateIncrement,
        isYearPassed, isTommorow
      };
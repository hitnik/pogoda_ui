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

    // ВАжно не забыть поменять дату в продакшен

    date = new Date(date.setDate(date.getDate() - 4));
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
  }

const convertDateToTopic = (isoDate)=> {
    const localDate = new Date(isoDate);
    var options = {day: 'numeric',  month: 'long', year: 'numeric'};
    return localDate.toLocaleDateString('ru-Ru', options)
}

export {compareForumsData, convertDateToLocalIso,
        convertDateToLocalRu, yesterday,
        convertDateToTopic,
      };
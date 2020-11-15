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
  return localDate.getFullYear()+'-'+localDate.getMonth()+'-'+localDate.getDay()
}  

const convertDateToLocalRu = (isoDate) =>{
  const localDate = new Date(isoDate);
  return localDate.toLocaleDateString('ru-Ru')
}  

export {compareForumsData, convertDateToLocalIso,convertDateToLocalRu};
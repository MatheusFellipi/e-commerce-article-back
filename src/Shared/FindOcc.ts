export const Find = {
  Occ(arr: any[], key: string, acc?: string) {
    let arrAux = [];

    arr.forEach((item) => {
      if (arrAux.some((val) => val[key] === item[key])) {
        arrAux.forEach((k) => {
          if (k[key] === item[key]) {
            if (!acc) {
              k['total']++;
            }
            if (acc) {
              k[acc] = item[acc] + item[acc];
            }
          }
        });
      } else {
        let newObject = {};
        newObject[key] = item[key];
        if (!acc) {
          newObject['total'] = 1;
        }
        if (acc) {
          newObject[acc] = item[acc];
        }
        arrAux.push(newObject);
      }
    });

    return arrAux.sort();
  },
};

import settings from 'app/settings';
import constants from './constants';

const commonFuc = {
  addSTTForList: (arr, start) => {
    if (!arr) {
      return [];
    }
    return arr.map((ele, index) => ({ stt: index + 1 + start, ...ele }));
  },

  getKeyOfCurrentRoute: (currentRoute) => {
    if (!currentRoute) {
      return settings.routes.home;
    }

    let objectKeys = Object.keys(settings.routes);

    const routes = objectKeys.map((key) => settings.routes[key]).reverse();

    for (const route of routes) {
      if (currentRoute.includes(route.url)) {
        return route.url;
      }
    }

    return settings.routes.home;
  },

  getBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },

  toVietnamDay: (dayString) => {
    const days = [];
    if (typeof dayString === 'string') {
      const daySplit = dayString.split(', ');

      if (daySplit.length > 0) {
        for (const element of daySplit) {
          // eslint-disable-next-line no-unused-vars
          for (const [_, day] of Object.entries(settings.constants.DayOfWeek)) {
            if (day.key === element) {
              days.push(day.value);
            }
          }
        }
      }
    }

    return days;
  },

  formatDate: (dateString) => {
    if (dateString === '') {
      return '';
    }
    const day = new Date(dateString);
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  },

  getNext7day: () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return commonFuc.formatDate(date.toString());
  },

  getStatusObj: (statusValue, statusObj) => {
    // eslint-disable-next-line no-unused-vars
    for (const [_, element] of Object.entries(statusObj)) {
      if (element.key === statusValue) {
        return element;
      }
    }
  },

  getListState: (status) => {
    const states = constants.UserClassStatus[status].state;

    let objectKeys = Object.keys(constants.UserClassStatus);

    const userClassStatus = [];

    for (const key of objectKeys) {
      if (states.includes(key)) {
        userClassStatus.push(constants.UserClassStatus[key]);
      }
    }

    return userClassStatus;
  },

  groupBranch: (branches) => {
    // return branches.reduce(function (rv, x) {
    //   (rv[x['length']] = rv[x['length']] || []).push(x);
    //   return rv;
    // }, {});

    const grouped = branches.reduce((previousValue, currentValue) => {
      (previousValue[currentValue.name] =
        previousValue[currentValue.name] || []).push(currentValue);
      return previousValue;
    }, {});

    const data = [];

    for (const [key, value] of Object.entries(grouped)) {
      const group = key;
      const options = value.map((ele) => {
        return { key: ele.id, value: ele.address };
      });

      data.push({ group, options });
    }

    console.log({ data });

    return data;
  },
};

export default commonFuc;

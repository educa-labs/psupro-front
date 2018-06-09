import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

// Preprocessors for each API endpoint
import preprocessors from './preprocessors';

const API = {
  url: 'http://localhost:3000',

  careers(id, config) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get(`${API.url}/carreers/${id}`, config)
        .then(response => resolve(preprocessors.careers(response.body)))
        .catch(error => reject(error));
    });
  },

  similar(parameters) {
    let config = { params: parameters };

    return new Promise((resolve, reject) => {
      Vue.http
        .get(`${API.url}/similar`, config)
        .then(response => {
          resolve(
            preprocessors.similar(
              response.body.map(APICareer => {
                return preprocessors.careers(APICareer);
              })
            )
          );
        })
        .catch(error => reject(error));
    });
  },

  universities: {
    universities(id, config) {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/universities/${id}`, config)
          .then(response => {
            let preprocessor = preprocessors.universities.universities;

            resolve(preprocessor(response.body, config));
          })
          .catch(error => reject(error));
      });
    },

    careers(id) {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/universities/${id}/carreers`)
          .then(response => {
            let preprocessor = preprocessors.universities.careers;

            resolve(preprocessor(response.body));
          })
          .catch(error => reject(error));
      });
    },

    campus(id) {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/universities/${id}/campus`)
          .then(response => {
            let preprocessor = preprocessors.universities.campus;

            resolve(preprocessor(response.body));
          })
          .catch(error => reject(error));
      });
    },
  },

  campus(id) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get(`${API.url}/campus/${id}`)
        .then(response => resolve(response.body))
        .catch(error => reject(error));
    });
  },

  popular: {
    careers(limit = 4) {
      let config = { params: { limit } };

      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/popular/carreers`, config)
          .then(response => resolve(response.body))
          .catch(error => reject(error));
      });
    },

    universities(limit = 4) {
      let config = { params: { limit } };

      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/popular/universities`, config)
          .then(response => resolve(response.body))
          .catch(error => reject(error));
      });
    },
  },

  search(parameters) {
    let config = { params: parameters };

    return new Promise((resolve, reject) => {
      Vue.http
        .get(`${API.url}/search`, config)
        .then(response => resolve(preprocessors.search(response.body)))
        .catch(error => reject(error));
    });
  },

  constants: {
    cities() {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/cities`)
          .then(response => {
            let preprocessor = preprocessors.constants.cities;

            resolve(preprocessor(response.body));
          })
          .catch(error => reject(error));
      });
    },

    citiesPerRegion(id) {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/regions/${id}/cities`)
          .then(response =>
            resolve(
              response.body.map(APICareer => {
                return preprocessors.constants.cities(APICareer);
              })
            )
          )
          .catch(error => reject(error));
      });
    },

    degreeTypes() {
      let APIDegreeTypes = [
        { id: 1, title: 'Profesional' },
        { id: 2, title: 'Técnica' },
      ];

      return new Promise((resolve, reject) => {
        let preprocessor = preprocessors.constants.degreeTypes;

        resolve(preprocessor(APIDegreeTypes));
      });
    },

    regions() {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/regions`)
          .then(response => {
            let preprocessor = preprocessors.constants.regions;

            resolve(preprocessor(response.body));
          })
          .catch(error => reject(error));
      });
    },
  },

  news: {
    news() {
      return new Promise((resolve, reject) => {
        Vue.http
          .get(`${API.url}/news`)
          .then(response => resolve(response.body))
          .catch(error => reject(error));
      });
    },
  },
};

export default API;

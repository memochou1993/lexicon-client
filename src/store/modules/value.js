import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    valueData: Base.state(),
  },
  mutations: {
    setValueData(state, payload) {
      state.valueData = Base.update(state.valueData, payload);
    },
  },
  actions: {
    storeValue({
      commit,
    }, {
      keyId,
      text,
      languageId,
      formId,
    }) {
      commit('setValueData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `keys/${keyId}/values`,
          data: {
            text,
            language_id: languageId,
            form_id: formId,
          },
        })
          .then(({ data }) => {
            commit('setValueData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setValueData', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
    fetchValue({
      commit,
    }, {
      valueId,
    }) {
      commit('setValueData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/values/${valueId}`,
        })
          .then(({ data }) => {
            commit('setValueData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setValueData', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
    updateValue({
      commit,
    }, {
      valueId,
      text,
    }) {
      commit('setValueData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `/values/${valueId}`,
          data: {
            text,
          },
        })
          .then(({ data }) => {
            commit('setValueData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setValueData', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
  },
};

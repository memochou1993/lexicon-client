import axios from 'axios';
import Base from '@/store/modules/base';

export default {
  namespaced: true,
  state: {
    keyList: Base.state(),
    keyData: Base.state(),
  },
  mutations: {
    setKeyList(state, payload) {
      state.keyList = Base.update(state.keyList, payload);
    },
    setKeyData(state, payload) {
      state.keyData = Base.update(state.keyData, payload);
    },
  },
  actions: {
    fetchKeys({
      commit,
    }, {
      projectId,
      page,
      relations,
    }) {
      commit('setKeyList');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `projects/${projectId}/keys`,
          params: {
            page,
            per_page: 10,
            relations,
          },
        })
          .then(({ data }) => {
            commit('setKeyList', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setKeyList', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
    fetchKey({
      commit,
    }, {
      keyId,
    }) {
      commit('setKeyData');
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/keys/${keyId}`,
        })
          .then(({ data }) => {
            commit('setKeyData', data);
            resolve(data);
          })
          .catch((error) => {
            commit('setKeyData', error);
            commit('setError', error, { root: true });
            reject(error);
          });
      });
    },
  },
};

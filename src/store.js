/* global solid, $rdf */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

const graph = $rdf.graph();
const fetcher = new $rdf.Fetcher(graph);

const SESSION_CHANGE = 'session-change';
const PROFILE_RETRIEVE_DATA = 'profile-retrieve-data';
const FRIENDS_RETRIEVE_DATA = 'friends-retrieve-data';

const store = new Vuex.Store({
  state: {
    person: null,
    fullName: null,
    organizationName: null,
    role: null,
    friends: []
  },
  mutations: {
    [SESSION_CHANGE]: (state, person) => {
      state.person = person;
    },
    [PROFILE_RETRIEVE_DATA]: (state, { fullName, organizationName, role }) => { 
      state.fullName = fullName;
      state.organizationName = organizationName;
      state.role = role;
    },
    [FRIENDS_RETRIEVE_DATA]: (state, friends) => {
      state.friends = friends;
    }
  },
  actions: {
    login(context, popupUri = 'popup.html') {
      solid.auth.popupLogin({ popupUri })
    },

    logout() {
      solid.auth.logout();
    },

    async sessionChange({commit, dispatch}, { webId }) {
      commit(SESSION_CHANGE, webId);
      if (webId) {
        await fetcher.load(webId);
      }
      dispatch('loadProfile');
      dispatch('loadFriends');
    },

    loadProfile({ state: { person }, commit }) {
      let fullName = { value: null };
      let role = { value: null };
      let organizationName = { value: null };

      if (person) {
        fullName = graph.any($rdf.sym(person), FOAF('name'));
        organizationName = graph.any($rdf.sym(person), VCARD('organization-name'));
        role = graph.any($rdf.sym(person), VCARD('role'));
      }
      
      commit(PROFILE_RETRIEVE_DATA, { 
        fullName: fullName.value,
        role: role.value,
        organizationName: organizationName.value  
      });
    },
    
    async loadFriends({ state: { person }, commit }) {
      let friends = [];
      if (person) {
        friends = graph.each($rdf.sym(person), FOAF('knows'));
      }
      commit(FRIENDS_RETRIEVE_DATA, await friends.map(async (friend) => {
        await fetcher.load(friend);
        return graph.any(friend, FOAF('name')).value; 
      }));
    }
  }
})

solid.auth.trackSession(session => {
  store.dispatch('sessionChange', session || { webId: null });
})

export default store;
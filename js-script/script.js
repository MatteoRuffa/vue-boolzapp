import {contacts} from './data.js';

const {createApp} = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeId: 1
        }
    },
    methods: {
            
    },
    computed: {
        
    },
    mounted() {
        
    }
}).mount('#app');

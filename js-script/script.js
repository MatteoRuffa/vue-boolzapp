import {contacts} from './data.js';

const {createApp} = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            newMsg: ''
        }
    },
    methods: {
        classMsg(msg) {
            if (msg.status === 'sent') {
                return 'sent';
            } else {
                return 'received';
            }
        },
        sendMsg() {
            if (!this.newMsg.trim()) return;
            const contact = this.contacts.find((contact) => contact.id === this.activeContactId);
            if (contact) {
                contact.messages.push({
                    date:  new Date().toISOString(),
                    message: this.newMsg,
                    status: 'sent'
                });
                this.newMsg = '';
            }
        },
        findTheHour(dateString) {
            let date = new Date(dateString);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            return `${hours}:${minutes}:${seconds}`; 
        }
    },
    computed: {
        changeAvatar() {
            const contact = this.contacts.find((contact) => contact.id === this.activeContactId);
            return contact.messages;
        },
        activeContact() {
            const contact = this.contacts.find(contact => contact.id === this.activeContactId);
            return contact;
        }
    },
    mounted() {
        
    }
}).mount('#app');

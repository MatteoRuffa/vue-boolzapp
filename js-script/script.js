import {contacts} from './data.js';
import {autoAnswer} from './data.js';

const dt = luxon.DateTime;

const {createApp} = Vue;

createApp({
    data() {
        return {
            contacts: contacts,
            activeContactId: 1,
            newMsg: '',
            searchText: '',
            openedMenuIndex: null,
            showMsg: false,
            widthViewport: window.innerWidth,
            autoAnswer: autoAnswer
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
                    date:  dt.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
                    message: this.newMsg,
                    status: 'sent'
                });
                this.newMsg = '';
                setTimeout(() => {
                    contact.messages.push({
                        date:  new Date().toLocaleString(),
                        message: this.casualAnswer(),
                        status: 'received'
                    });
                },1000)
            }
        },
        findTheHour(dateString) {
            let hourExact = dateString.split(' ');
            return hourExact[1]; 
        },
        toggleMenu(index) {
            this.openedMenuIndex = this.openedMenuIndex === index ? null : index;
            document.addEventListener('click', this.closeMenu);
        },
        closeMenu() {
            if (!this.$refs.dropdown) {
              this.openedMenuIndex = null;
              document.removeEventListener('click', this.closeMenu);
            }
        },
        deleteMsg(index) {
            const contact = this.contacts.find((contact) => contact.id === this.activeContactId);
            contact.messages.splice(index, 1);
        },
        showOnlyMsg() {
            if(this.widthViewport <= 992) {
                this.showMsg = true;
            }
            
        },
        showOnlyContact(){
            if (this.widthViewport <= 992) {
                this.showMsg = false;
            }
        },
        updatesViewportWidth () {
            this.widthViewport = window.innerWidth;
        },
        casualAnswer() {
            const random = Math.floor(Math.random() * this.autoAnswer.length);
            return this.autoAnswer[random];
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
        },
        filteredContact(){		
            return this.contacts.filter((el) => el.name.toLowerCase().includes(this.searchText.toLowerCase()));
        },
        findLastMsg() {
            let result = {};
            this.contacts.forEach(contact => {
                const lastSentMsg = contact.messages.slice().reverse().find(msg => msg.status === 'received');
                if (lastSentMsg) {
                    result[contact.id] = this.findTheHour(lastSentMsg.date);
                }
            });
        return result;
        },
        isMsgNotEmpty() {
            return this.newMsg.trim().length > 0;
        }
    },
    mounted() {
        window.addEventListener('resize', this.updatesViewportWidth);
    },
    unmounted () {
        window.addEventListener('resize', this.updatesViewportWidth);
    }

}).mount('#app');

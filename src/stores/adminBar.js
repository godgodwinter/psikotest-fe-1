import {defineStore} from 'pinia';
export const useStoreAdminBar = defineStore({
    id: 'storeAdminBar',
        state: () => ({ isSidebarActive:false }),
    // state: ()=>({
    //     isSidebarActive: false,
    // }),
    getters:{
        getIsSidebarActive:(state)=> state.isSidebarActive,
    },
    actions:{
        toggleSideBar(){
            this.isSidebarActive = !this.isSidebarActive;
        },
    }
});

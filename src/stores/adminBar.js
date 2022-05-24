import {defineStore} from 'pinia';
export const useStoreAdminBar = defineStore({
    id: 'storeAdminBar',
        state: () => ({ 
            isSidebarActive:false,
            pagesActive:'' 
        }),
    // state: ()=>({
    //     isSidebarActive: false,
    // }),
    getters:{
        getIsSidebarActive:(state)=> state.isSidebarActive,
        getPagesActive:(state)=> state.pagesActive,
    },
    actions:{
        toggleSideBar(){
            this.isSidebarActive = !this.isSidebarActive;
        },
        setPagesActive(pages){
            this.pagesActive = pages;
        },
    }
});

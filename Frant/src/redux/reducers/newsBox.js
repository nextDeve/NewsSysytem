let initSate = {
    isLoding:true,
    isClose:false
}
export default function menu(prevState=initSate,action) {
    const {type,data}=action
    switch(type){
        case 'CHANGE_MENU_STATE':
            return {...prevState,...data}
        case 'CHANGE_LODING_STATE':
            return {...prevState,...data}
        default :
        return prevState
    }
};

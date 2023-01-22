enum Status {
    Waiting,
    Processing,
    Success,
    Errorr
};

const getStatusName = (status: Status | null) => {
    switch(status){
        case Status.Waiting:
            return 'Ожидание';
        case Status.Processing:
            return 'В обработке';
            
        case Status.Success:
            return 'Успешно';
            
        case Status.Errorr:
            return 'Ошибка';

        default:
            return '';
    }
}

export {Status, getStatusName};
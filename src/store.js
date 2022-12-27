export function createStore(reducer) {
    let state = reducer(undefined, {})              //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs = []                                      //массив подписчиков

    const getState = () => { return state; }                   //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),            //запоминаем подписчиков в массиве
        () => cbs = cbs.filter(c => c !== cb))      //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

    function dispatch(action) {
        if (typeof action === 'function') {         //если action - не объект, а функция
            return action(dispatch, getState)       //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action)      //пробуем запустить редьюсер
        if (newState !== state) {                    //проверяем, смог ли редьюсер обработать action
            state = newState                        //если смог, то обновляем state 
            for (let cb of cbs) cb()                //и запускаем подписчиков
        }
    }

    return {
        getState,                                   //добавление функции getState в результирующий объект
        dispatch,
        subscribe                                   //добавление subscribe в объект
    }
}


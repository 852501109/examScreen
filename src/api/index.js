import request from '../utils/request';
export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    })
}
export const getData = query => {
    return request({
        url: 'kyapi/view/getYearView',
        method: 'get',
        params: query
    })
}
export const loginApi = query => {
    return request({
        url: 'kyapi/view/login',
        method: 'get',
        params: query
    })
}

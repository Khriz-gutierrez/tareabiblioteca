import { createConnection, createPool} from 'mysql2'
const config = createPool({
    host: '127.o.0.1',
    user:'root',
    password:'57263598',
    database:'biblioteca2025',
    port: 3306,
    enableKeepAlive:true,
    keepAliveInitialDelay:true
})
export{config}
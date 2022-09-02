import * as apiLogin from './modules/login/login'
import * as apiSystem from './modules/main/system'
import * as apiDashbord from './modules/analysis/dashboard'
export default Object.assign({}, apiLogin, apiSystem, apiDashbord)

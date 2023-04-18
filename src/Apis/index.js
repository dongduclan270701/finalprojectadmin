import axios from 'axios'
import { API_ROOT } from 'Apis/utils'

export const fetchCollectingByName = async (name) => {
    const req = await axios.get(`${API_ROOT}/v1/collecting/${name}`)
    return req.data
}

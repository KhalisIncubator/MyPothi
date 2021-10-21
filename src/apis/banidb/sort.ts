import { banisOrder } from "defaults/BaniDB"
import { RemappedInfo } from "types/BanidbApi"

export const sortBani = ( firstBani: RemappedInfo, secondBani: RemappedInfo ) => banisOrder.indexOf( firstBani.baniID || 0 ) - banisOrder.indexOf( secondBani.baniID || 0 )
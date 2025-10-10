import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user : JwtPayload
        }
    }
}



//  akhane jak holo checkAuth ar viotre je req.user ta te verifu user take deya hocce oi user take jeno sob folder thake get kora jay tai akhane global declear koara hocce 
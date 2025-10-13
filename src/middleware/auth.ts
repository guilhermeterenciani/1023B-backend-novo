//Criar um middleware que bloqueia tudo
import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express';
function Auth(req: Request, res: Response, next: NextFunction) {
    console.log("Cheguei no middleware e bloqueei");
    const authHeaders = req.headers.authorization;
    console.log(authHeaders);
    if (!authHeaders)
        return res.status(401).json({ mensagem: "Voce não passou o token no Bearer" });
    const token = authHeaders.split(" ")[1]!;

    jwt.verify(token, process.env.JWT_SECRET!, (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ mensagem: "Token inválido" });
        }
        if (typeof decoded === "string" || !decoded || !("usuarioId" in decoded)) {
            return res.status(401).json({ mensagem: "Token inválido" });
        }
        // Token is valid, continue
        next();
    });
}

export default Auth;
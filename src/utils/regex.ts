import { z } from "zod"

export class ColorHex {
    public ColorHex(){}
    public hexParse(color: string){
        try {
            const colorHexSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/);
            const res = colorHexSchema.parse(color)
            return true
        } catch (e){
            return false
        }
    }
}
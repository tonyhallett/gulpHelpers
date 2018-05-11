import PluginError from 'plugin-error'
import File = require('vinyl');
import { TransformOptions } from 'stream'
export {File,PluginError}
export { Transform, TransformOptions } from "stream";
export type GulpStream=NodeJS.ReadWriteStream;
export type TransformCallback=(err?:any,data?:File)=>void;

export type GulpPluginWithOptions<TOptions>=(options:TOptions)=>GulpStream
export type GulpPluginWithOptionalOptions<TOptions>=(options?:TOptions)=>GulpStream
export type GulpPluginWithOptionsAndTransformOptions<TOptions>=(options:TOptions,transformOptions?:TransformOptions)=>GulpStream
export type GulpPluginWithoutOptions=()=>GulpStream
export type GulpPluginWithTranformOptions=(transformOptions?:TransformOptions)=>GulpStream
export class FileContentsTypeNotSupportedError extends Error{
    constructor(private bufferNotSupported:boolean){
        super(`Only ${bufferNotSupported?"streams":"buffers"} supported for File.contents`);
        this.BufferNotSupported=bufferNotSupported;
    }
    public BufferNotSupported:boolean;
    static create(pluginName:string,bufferNotSupported:boolean){
        return new PluginError(pluginName,new FileContentsTypeNotSupportedError(bufferNotSupported));
    }
}
export function cbErrorIfContentsTypeNotSupported(pluginName:string,file:File,cb:TransformCallback,bufferNotSupported=false,streamNotSupported=true):boolean{
    const threw=file.isStream()&&streamNotSupported||file.isBuffer()&&bufferNotSupported;
    if(threw){
        cb(FileContentsTypeNotSupportedError.create(pluginName,bufferNotSupported));
    }
    return threw;
}
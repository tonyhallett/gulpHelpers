# What is it ?

Some typescript types for a Gulp plugin
e.g
```
export type GulpStream=NodeJS.ReadWriteStream;
export type GulpPluginWithTranformOptions=(transformOptions?:TransformOptions)=>GulpStream
```

and 

```
export class FileContentsTypeNotSupportedError extends Error{
    constructor(bufferNotSupported:boolean){
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
```
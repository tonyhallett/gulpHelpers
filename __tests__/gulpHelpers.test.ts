import {cbErrorIfContentsTypeNotSupported,PluginError} from '../gulpHelpers';
import {createBufferFile,createStreamFile} from '../../gulpPluginTestHelpers'
describe('gulp helpers',()=>{
    describe('cbErrorIfContentsTypeNotSupported',()=>{
        describe('throws and calls the callback',()=>{
            it('when stream and stream not supported',()=>{
                const pluginName="Some plugin";
                const mockCallback=jest.fn();
                const threw=cbErrorIfContentsTypeNotSupported(pluginName,createStreamFile(""),mockCallback,false,true);
                expect(threw).toBe(true);
                const callbackErrorArg=mockCallback.mock.calls[0][0];
                expect(callbackErrorArg).toBeInstanceOf(PluginError);
                expect(callbackErrorArg.plugin).toBe(pluginName);
                expect(callbackErrorArg.BufferNotSupported).toBe(false);
            })
            it('when buffer and buffer not supported',()=>{
                const pluginName="Some plugin";
                const mockCallback=jest.fn();
                const threw=cbErrorIfContentsTypeNotSupported(pluginName,createBufferFile(""),mockCallback,true,false);
                expect(threw).toBe(true);
                const callbackErrorArg=mockCallback.mock.calls[0][0];
                expect(callbackErrorArg).toBeInstanceOf(PluginError);
                expect(callbackErrorArg.plugin).toBe(pluginName);
                expect(callbackErrorArg.BufferNotSupported).toBe(true);
            })
        })
        describe('does not throw and does not call the callback',()=>{
            it('when buffer and buffer supported',()=>{
                const mockCallback=jest.fn();
                const threw=cbErrorIfContentsTypeNotSupported("",createBufferFile(""),mockCallback,false,false);
                expect(threw).toBe(false);
                expect(mockCallback).not.toHaveBeenCalled();
            });
            it('when stream and stream supported',()=>{
                const mockCallback=jest.fn();
                const threw=cbErrorIfContentsTypeNotSupported("",createStreamFile(""),mockCallback,false,false);
                expect(threw).toBe(false);
                expect(mockCallback).not.toHaveBeenCalled();
            })
        })
        describe('optional parameters just for coverage',()=>{
            it('is annoying to do this',()=>{
                const mockCallback=jest.fn();
                cbErrorIfContentsTypeNotSupported("",createBufferFile(""),mockCallback);
            })
        })
    })
})
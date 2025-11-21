
import React, { useState, useRef, useEffect } from 'react';
import { getFileType, FileType } from '../utils/fileUtils';
import { MicIcon } from './icons/MicIcon';
import { Language, translations } from '../utils/translations';

export interface InputFile {
  file: File;
  type: FileType;
  preview: string;
}

interface InputBarProps {
  onSend: (text: string, files: InputFile[]) => void;
  disabled: boolean;
  currentLang: Language;
  isAudioMode: boolean;
}

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
const PaperclipIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
);


export const InputBar: React.FC<InputBarProps> = ({ onSend, disabled, currentLang, isAudioMode }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<InputFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const t = translations[currentLang].ui;

  const handleSend = () => {
    if (disabled || (text.trim() === '' && files.length === 0)) return;
    onSend(text, files);
    setText('');
    setFiles([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: InputFile[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (file) {
            const type = getFileType(file);
            if (type) {
                newFiles.push({ file, type, preview: URL.createObjectURL(file) });
            }
        }
    }
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleRecord = async () => {
    if (isRecording) {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    } else {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioFile = new File([audioBlob], "voice_message.webm", { type: 'audio/webm' });
                
                const inputFile = { file: audioFile, type: 'audio' as FileType, preview: URL.createObjectURL(audioFile) };

                if (isAudioMode) {
                    // In audio mode, send immediately
                    onSend('', [inputFile]);
                } else {
                    // In text mode, add to attachments
                    setFiles(prev => [...prev, inputFile]);
                }
                
                stream.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            };
            
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("لا يمكن الوصول للميكروفون. يرجى التأكد من السماح بالوصول.");
        }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Audio Mode UI
  if (isAudioMode) {
      return (
          <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-6 flex justify-center items-center h-[140px]">
              <button 
                onClick={handleRecord} 
                disabled={disabled && !isRecording} 
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.2)] border-4 
                    ${isRecording 
                        ? 'bg-red-500 text-white border-red-300 animate-pulse scale-110' 
                        : 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-emerald-400 hover:scale-105'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isRecording ? 'Stop Recording' : 'Record Voice'}
              >
                <MicIcon className={`${isRecording ? 'w-10 h-10' : 'w-10 h-10'}`}/>
              </button>
              {isRecording && (
                  <span className="absolute mt-32 text-white/80 font-bold animate-pulse text-sm tracking-wider">
                      {t.recording}
                  </span>
              )}
          </div>
      );
  }

  // Standard UI
  return (
    <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-4 md:p-6">
      {files.length > 0 && (
        <div className="mb-4 p-3 bg-white/5 rounded-xl flex gap-3 overflow-x-auto custom-scrollbar border border-white/10">
          {files.map((inputFile, index) => (
            <div key={index} className="relative flex-shrink-0 group">
               {inputFile.type === 'image' && <img src={inputFile.preview} className="w-20 h-20 rounded-lg object-cover shadow-md"/>}
               {inputFile.type === 'video' && <video src={inputFile.preview} className="w-20 h-20 rounded-lg object-cover shadow-md"/>}
               {inputFile.type === 'audio' && <div className="w-20 h-20 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-white/10"><MicIcon className="w-8 h-8 text-white"/></div>}
               <button onClick={() => setFiles(f => f.filter((_, i) => i !== index))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*" onChange={handleFileChange} className="hidden" />
        
        <button 
            onClick={() => fileInputRef.current?.click()} 
            disabled={disabled} 
            className="p-3 text-emerald-200 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
            title="Attach file"
        >
            <PaperclipIcon />
        </button>
        
        <button 
            onClick={handleRecord} 
            disabled={disabled && !isRecording} 
            className={`p-3 transition-all duration-300 rounded-full shadow-lg ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} disabled:opacity-50`}
            title={isRecording ? 'Stop Recording' : 'Record Voice'}
        >
            <MicIcon className="w-6 h-6"/>
        </button>

        <div className="flex-grow relative">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={isRecording ? t.recording : t.inputPlaceholder}
                rows={1}
                disabled={disabled}
                className="w-full bg-white/10 text-white placeholder-emerald-200/50 rounded-full py-3 px-6 resize-none focus:ring-2 focus:ring-amber-400 focus:outline-none border border-white/10 disabled:opacity-50 transition-all"
                style={{minHeight: '50px'}}
            />
        </div>
        
        <button 
            onClick={handleSend} 
            disabled={disabled} 
            className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-400 hover:to-amber-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 transition-all"
            title={t.send}
        >
            <SendIcon className="w-6 h-6 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
